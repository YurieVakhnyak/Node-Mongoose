const express = require("express");
const router = new express.Router();

const { addPostValidation } = require("../middleware/validationMiddleware.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
} = require("../controllers/postsController.js");

router.use(authMiddleware);

router.get("/", asyncWrapper(getPostsController));
router.get("/:id", asyncWrapper(getPostByIdController));
router.post("/", addPostValidation, asyncWrapper(addPostController));
router.put("/:id", addPostValidation, asyncWrapper(changePostController));
router.delete("/:id", asyncWrapper(deletePostController));

module.exports = { postRouter: router };
