const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.post("/", controller.CreateArticle);
router.get("/", controller.showAllArticle);
router.put("/", controller.editArticle);
router.delete("/", controller.deleteArticle);

module.exports = router;
