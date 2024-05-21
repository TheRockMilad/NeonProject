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
  const decoded = jwt.verify(token, config.get(jwt));
  const user = User.findById(decoded._id);
  req.user = user;
  next();
}

module.exports = {
    isLoggined
}