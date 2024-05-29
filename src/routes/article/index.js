const express = require("express");
const controller = require("./controller");
const validator = require("./validator");
const router = express.Router();
const { isAuthor } = require("./../../middleware/auth");

router.post(
  "/",
  validator.CreatreArticleValidation(),
  controller.validate,
  controller.CreateArticle
);
router.get("/", controller.showAllArticle);
router.get("/me", controller.userArticle);
router.put("/:articleId", isAuthor, controller.editArticle);
router.delete("/:articleId", controller.deleteArticle);

module.exports = router;
