let express = require("express");
let router = express.Router();
const packageJson = require("../package.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Sample Blogs with Express.js", version: packageJson.version });
});

module.exports = router;
