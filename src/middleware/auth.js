const { User, Article, response } = require("../routes/auth/controller");
const jwt = require("jsonwebtoken");
const config = require("config");

async function isLoggined(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return response({
      res,
      code: 401,
      message: "access denied _ User not logged in ",
    });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwt"));
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    return response({
      res,
      code: 400,
      message: "Invalid token.",
    });
  }
}

async function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return response({
      res,
      code: 403,
      message: "Access denied. Admin privileges required ",
    });
  }
  next();
}

async function isAuthor(req, res, next) {
  const article = await Article.findById(req.params.articleId);
  if (!article) {
    return response({
      res,
      code: 404,
      message: "this article does not exist",
    });
  }
  if (!req.user._id.equals(article.author)) {
    return response({
      res,
      code: 403,
      message: "You are not authorized",
    });
  }
  next();
}

module.exports = {
  isLoggined,
  isAdmin,
  isAuthor,
};
