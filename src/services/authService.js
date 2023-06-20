const bcrypt = require("bcrypt");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");

const { User } = require("../db/userModel");
const { Verification } = require("../db/verificationModel");
const { NotAuthorizedError } = require("../helpers/errors");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async (email, password) => {
  const user = new User({ email, password });

  await user.save();

  const code = sha256(email + process.env.JWT_SECRET);

  const verification = new Verification({
    code,
    userId: user._id,
  });
  await verification.save();
};

const registrationConfirmation = async (code) => {
  const verification = await Verification.findOne({
    code,
    active: true,
  });

  if (!verification) {
    throw new NotAuthorizedError("Invalid or expired confirmation code");
  }

  const user = await User.findById(verification.userId);

  if (!user) {
    throw new NotAuthorizedError("No user found!");
  }

  verification.active = false;
  await verification.save();

  user.confirmed = true;
  await user.save();

  // const user = new User({ email, password });
  // await user.save();

  const msg = {
    to: email,
    from: "yurievakhnyak@gmail.com", // Use the email address or domain you verified above
    subject: "Thank you for registration!",
    text: `Please confirm your email adress POST http://localhost:8081/api/auth/registration_confirmation/${code}`,
    html: `Please confirm your email adress POST http://localhost:8081/api/auth/registration_confirmation/${code}`,
  };
  await sgMail.send(msg);
};
const login = async (email, password) => {
  const user = await User.findOne({ email, confirmed: true });

  if (!user) {
    throw new NotAuthorizedError(`No user whith email '${email}' found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }
  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email, confirmed: true });
  if (!user) {
    throw new NotAuthorizedError("No user found!");
  }

  const password = sha256(Date.now() + process.env.JWT_SECRET);
  user.password = password;
  user.save();

  const msg = {
    to: user.email,
    from: "yurievakhnyak@gmail.com", // Use the email address or domain you verified above
    subject: "Forgot password",
    text: `Please confirm your email adress POST http://localhost:8081/api/auth/registration_confirmation/${code}`,
    html: `Here is your temporary password ${code}`,
  };
  await sgMail.send(msg);
};

module.exports = {
  registration,
  login,
  registrationConfirmation,
  forgotPassword,
};
