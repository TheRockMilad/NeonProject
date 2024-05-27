const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async CreateArticle(req, res) {
    res.send(`create article`);
  }
  async showAllArticle(req, res) {
    res.send(`show article`);
  }
  async editArticle(req, res) {
    res.send(`edit article`);
  }
  async deleteArticle(req, res) {
    res.send(`delte article`);
  }
})();
