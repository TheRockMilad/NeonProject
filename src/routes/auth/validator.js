const expressValidation = require("express-validator");
const check = expressValidation.check;

module.exports = new (class {
  registerValidation() {
    return [
      check("email").isEmail().withMessage("Email is invalid"),
      check("email").not().isEmpty().withMessage("Email couldn't be empty"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("password couldn't be empty"),
      check("name").not().isEmpty().withMessage("name couldn't be empty"),
    ];
  }
  loginValidation() {
    return [
      check("email").isEmail().withMessage("Email is invalid"),
      check("email").not().isEmpty().withMessage("Email couldn't be empty"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("password couldn't be empty"),
    ];
  }
})();
