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

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = {
  Verification,
};
