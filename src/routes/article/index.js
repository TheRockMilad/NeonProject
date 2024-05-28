const express = require("express");
const controller = require("./controller");
const validator = require("./validator");
const router = express.Router();

router.post("/", validator.CreatreArticleValidation, controller.CreateArticle);
router.get("/", controller.showAllArticle);
router.put("/", controller.editArticle);
router.delete("/", controller.deleteArticle);

module.exports = router;
