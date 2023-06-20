const express = require("express");
const router = new express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  registrationController,
  loginController,
  registrationConfirmationController,
  forgotPasswordController,
} = require("../controllers/authController.js");

router.post("/registration", asyncWrapper(registrationController));
router.post(
  "/registration_confirmation/:code",
  asyncWrapper(registrationConfirmationController)
);
router.post("/forgot_password", asyncWrapper(forgotPasswordController));
router.post("/login", asyncWrapper(loginController));

module.exports = { authRouter: router };
