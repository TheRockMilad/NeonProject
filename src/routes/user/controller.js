const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async main(req, res) {
    res.send(`Welcome to Site ${req.user.name}`);
  }

  async allUser(req,res){
    const users = await this.User.find({}).select("email name _id")
    res.json(users)
  }
})();
