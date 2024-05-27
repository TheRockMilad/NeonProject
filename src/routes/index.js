const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");
const articleRouter = require("./article");
const { isLoggined, isAdmin } = require("./../middleware/auth");

router.use("/auth", authRouter);
router.use("/user", isLoggined, userRouter);
router.use("/article", isLoggined, articleRouter);
router.use("/admin", isLoggined, isAdmin, adminRouter);

module.exports = router;