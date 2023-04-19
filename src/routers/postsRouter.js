const express = require("express");
const router = new express.Router();

const { addPostValidation } = require("../middleware/validationMiddleware.js");

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
} = require("../controllers/postsController.js");

router.get("/", asyncWrapper(getPosts));
router.get("/:id", asyncWrapper(getPostById));
router.post("/", addPostValidation, asyncWrapper(addPost));
router.put("/:id", addPostValidation, asyncWrapper(changePost));
router.delete("/:id", asyncWrapper(deletePost));

module.exports = { postRouter: router };
