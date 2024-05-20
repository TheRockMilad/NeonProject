const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports = new (class extends controller {
  async register(req, res) {
    try {
      let user = await this.User.findOne({ email: req.body.email });
      if (user) {
        return this.response({
          res,
          code: 400,
          message: "This user already registered",
        });
      }
      user = new this.User(
        _.pick(req.body, ["email", "password", "name", "family", "age"])
      );
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      this.response({
        res,
        message: "Successfull registered",
        data: _.pick(user, ["_id", "email", "name", "family", "age"]),
      });
    } catch (error) {
      this.response({
        res,
        code: 500,
        message: "An error occurred",
      });
    }
  }

  login(req, res) {
    res.send("login");
  }
})();
