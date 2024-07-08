const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.get(
  "/",
  controller.main
);

router.get(
  "/all",
  controller.allUser
);

module.exports = router;
