const { User, response } = require("../routes/auth/controller");
const jwt = require("jsonwebtoken");
const config = require("config");

async function isLoggined(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    response({
      res,
      code: 401,
      message: "access denied",
    });
  }
  const decoded = jwt.verify(token, config.get("jwt"));
  const user = await User.findById(decoded._id);
  req.user = user;
  next();
}

async function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return response({ res, message: "Access denied" });
  }
  next();
}

module.exports = {
  isLoggined,
  isAdmin
};
