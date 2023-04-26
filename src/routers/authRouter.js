const express = require("express");
const router = new express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  registrationController,
  loginController,
} = require("../controllers/authController.js");

router.post("/registration", asyncWrapper(registrationController));
router.post("/login", asyncWrapper(loginController));

module.exports = { authRouter: router };
