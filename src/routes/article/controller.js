const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async CreateArticle(req, res) {
    try {
      const { title, content } = _.pick(req.body, ["title", "content"]);
      const user = req.user;

      const newArticle = new this.Article({
        title,
        content,
        author: user._id,
        published : true
      });

      const savedArticle = await newArticle.save();

      user.articles.push(savedArticle._id);
      await user.save();
      this.response({
        res,
        code: 201,
        message: "Article Created",
        data: {
          user: user.name,
          title,
          content,
        },
      });
    } catch (error) {
      this.response({
        res,
        code: 500,
        message: "Error",
      });
    }
  }
  async showAllArticle(req, res) {
    try {
      const articles = await this.Article.find()
        .populate('author', 'name') // اینجا نام کاربر را دریافت می‌کنیم
        .select('title content createdAt'); // انتخاب فیلدهای مورد نظر از مقاله
  
      this.response({
        res,
        code: 200,
        message: "Articles fetched successfully",
        data: articles.map(article => ({
          author: article.author.name,
          title: article.title,
          content: article.content,
          createdAt: article.createdAt
        }))
      });
    } catch (error) {
      this.response({
        res,
        code: 500,
        message: "Error fetching articles",
      });
    }
  }
  async editArticle(req, res) {
    res.send(`edit article`);
  }
  async deleteArticle(req, res) {
    res.send(`delte article`);
  }
})();
