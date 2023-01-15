let express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const Blogs = require("../../lib/db/blogs");

router.get("/", async function (req, res, next) {
  try {
    const blogs = await Blogs.find({});
    res.status(200).send(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);
    res.status(200).send(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/", async function (req, res, next) {
  try {
    console.log("Req", req.body);
    const newBlog = new Blogs(req.body);
    newBlog.save();
    console.log("New Blog", newBlog);
    res.status(200).send(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    console.log("Delete", typeof id, id);
    const deletedBlog = await Blogs.findByIdAndRemove(id);
    res.status(200).send(deletedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.put("/", async function (req, res, next) {
  try {
    console.log("Req", req.body);
    const updatedBlog = await Blogs.findByIdAndUpdate(req.body._id, req.body);
    console.log("Updated Blog", updatedBlog);
    res.status(200).send(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
