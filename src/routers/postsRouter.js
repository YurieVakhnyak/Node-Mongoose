const express = require("express");
const router = new express.Router();

const {
  addPostValidation,
  patchPostValidation,
} = require("../middleware/validationMiddleware.js");

const modelsMiddleware = require("../middleware/models.js");
const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require("../controllers/postsController.js");

router.use(modelsMiddleware);

router.get("/", asyncWrapper(getPosts));
router.get("/:id", asyncWrapper(getPostById));
router.post("/", addPostValidation, asyncWrapper(addPost));
router.put("/:id", addPostValidation, asyncWrapper(changePost));
router.patch("/:id", patchPostValidation, asyncWrapper(patchPost));
router.delete("/:id", asyncWrapper(deletePost));

module.exports = { postRouter: router };
