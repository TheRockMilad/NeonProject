const { validationResult } = require("express-validator");
const autoBind = require('auto-bind')
const User = require('./../model/users')

module.exports = class {
  constructor() {
    autoBind(this)
    this.User = User
  }
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const message = [];
      const errors = result.array();
      for (const error of errors) {
        message.push(error.msg);
      }
      res.status(400).json({
        message: "validation Error",
        data: message,
      });
      return false;
    }
    return true;
  }

  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }
};
