let createError = require("http-errors");
let express = require("express");
let cors = require("cors");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
require("dotenv").config();

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let blogsRouter = require("./routes/api/blogs");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI);

let app = express();
app.use(cors())
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`::: Sample Blog using Express.js App :::\nlistening on port ${port}`));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/blogs", blogsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
