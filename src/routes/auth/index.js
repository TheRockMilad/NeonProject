const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validation");

router.post("/register", validator.registerValidator, controller.register);

router.post("/login", controller.login);

module.exports = router;
