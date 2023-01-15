const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  topic: String,
  content: String,
  author: String,
});

const Blogs = mongoose.model("Blog", BlogSchema);
module.exports = Blogs;
