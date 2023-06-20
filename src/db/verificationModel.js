const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const verificationSchema = new mongoose.Schema({
  code: {
    type: String,
    requared: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    requared: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
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

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = {
  Verification,
};
