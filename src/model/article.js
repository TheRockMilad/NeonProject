const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  published: { type: Boolean, default: false }
});

articleSchema.plugin(timestamp);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
