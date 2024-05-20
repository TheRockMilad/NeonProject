const controller = require('./../controller')

module.exports = new (class extends controller {
  register(req, res) {
    res.send("register");
  }
  login(req, res) {
    res.send("login");
  }
})();
