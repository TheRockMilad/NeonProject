const express = require("express");
const controller = require("./controller");
const router = express.Router();
const validator = require("./validator");

router.post(
  "/register",
  validator.registerValidation(),
  controller.validate,
  controller.register
);

router.post(
  "/login",
  validator.loginValidation(),
  controller.validate,
  controller.login
);

module.exports = router;
