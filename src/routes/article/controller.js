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
        published: true,
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
        .populate("author", "name") // اینجا نام کاربر را دریافت می‌کنیم
        .select("title content createdAt"); // انتخاب فیلدهای مورد نظر از مقاله

      this.response({
        res,
        code: 200,
        message: "Articles fetched successfully",
        data: articles.map((article) => ({
          author: article.author.name,
          title: article.title,
          content: article.content,
          createdAt: article.createdAt,
        })),
      });
    } catch (error) {
      this.response({
        res,
        code: 500,
        message: "Error fetching articles",
      });
    }
  }
  async userArticle(req, res) {
    try {
      const userId = req.user._id;
      // پیدا کردن مقالاتی که توسط کاربر وارد شده نوشته شده‌اند
      const articles = await this.Article.find({ author: userId });
      this.response({
        res,
        code: 200,
        message: "Your articles",
        data: articles,
      });
    } catch (error) {
      this.response({
        res,
        code: 500,
        message: "Something went wrong",
      });
    }
  }
  async editArticle(req, res) {
    try {
      // یافتن مقاله بر اساس ID
      const article = await this.Article.findById(req.params.articleId);

      // بررسی وجود مقاله
      if (!article) {
        return this.response({
          res,
          code: 404,
          message: "This article does not exist",
        });
      }

      // بررسی مجاز بودن کاربر برای ویرایش مقاله
      if (!req.user._id.equals(article.author)) {
        return this.response({
          res,
          code: 403,
          message: "You are not authorized to edit this article",
        });
      }

      // به‌روزرسانی فیلدهای مقاله
      const updates = ["title", "content"]; // لیستی از فیلدهایی که اجازه به‌روزرسانی دارند
      for (const field of updates) {
        if (req.body[field] !== undefined) {
          article[field] = req.body[field];
        }
      }

      // ذخیره مقاله به‌روزرسانی‌شده
      const updatedArticle = await article.save();

      // ارسال پاسخ موفقیت
      return this.response({
        res,
        code: 200,
        message: "Article updated successfully",
        data: updatedArticle,
      });
    } catch (error) {
      // رسیدگی به خطاها
      return this.response({
        res,
        code: 500,
        message: "An error occurred " + error,
      });
    }
  }
  async deleteArticle(req, res) {
    try {
      // یافتن مقاله بر اساس ID
      const article = await this.Article.findById(req.params.articleId);

      // بررسی وجود مقاله
      if (!article) {
        return this.response({
          res,
          code: 404,
          message: "This article does not exist",
        });
      }

      // بررسی مجاز بودن کاربر برای حذف مقاله
      if (!req.user._id.equals(article.author)) {
        return this.response({
          res,
          code: 403,
          message: "You are not authorized to delete this article",
        });
      }

      // حذف مقاله
      await this.Article.findByIdAndDelete(req.params.articleId);

      // ارسال پاسخ موفقیت
      return this.response({
        res,
        code: 200,
        message: "Article deleted successfully",
      });
    } catch (error) {
      console.error(error); // چاپ خطا برای اشکال‌زدایی
      return this.response({
        res,
        code: 500,
        message: "An error occurred ",
      });
    }
  }
})();
