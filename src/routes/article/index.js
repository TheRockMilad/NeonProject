const express = require("express");
const controller = require("./controller");
const validator = require("./validator");
const router = express.Router();

router.post(
  "/",
  validator.CreatreArticleValidation(),
  controller.validate,
  controller.CreateArticle
);
router.get("/", controller.showAllArticle);
router.get("/me", controller.userArticle);
router.put("/", controller.editArticle);
router.delete("/", controller.deleteArticle);

module.exports = router;
