const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.post("article", controller.CreateArticle);
router.get("article", controller.showAllArticle);
router.put("article", controller.editArticle);
router.delete("article", controller.deleteArticle);

module.exports = router;
