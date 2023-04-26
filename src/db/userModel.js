const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requared: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  title: String,
  bio: String,
  password: {
    type: String,
    requared: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
