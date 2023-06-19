const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const router = new express.Router();

const FILE_DIR = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, FILE_DIR);
  },
  filename: (req, file, callback) => {
    const [filename, extension] = file.originalname.split(".");
    callback(null, `${uuidv4()}.${extension}`);
  },
});

const { asyncWrapper } = require("../helpers/apiHelpers");
const { uploadController } = require("../controllers/filesController.js");

const uploadMiddleware = multer({ storage });

router.post(
  "/upload",
  uploadMiddleware.single("avatar"),
  asyncWrapper(uploadController)
);
router.use("/download", express.static(FILE_DIR));

module.exports = { filesRouter: router };
