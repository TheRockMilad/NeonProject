module.exports = new (class {
  register(req, res) {
    res.send("register");
  }
  login(req, res) {
    res.send("login");
  }
})();
