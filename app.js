const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");
const taskRouter = require("./routes/tasks");
const reviewRouter = require("./routes/review");
const questionsRouter = require("./routes/questions");
const quizRouter = require("./routes/quiz");
const interviewRouter = require("./routes/interview");
const screenerRouter = require("./routes/screener");

require("dotenv").config();

const app = express();

const gzipOptions = {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(compression());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", express.static(path.join(__dirname, "public/docs")));
// app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/bundle", expressStaticGzip(path.join(__dirname, "dist/bundle"), gzipOptions));

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to DB");
      try {
        require("./utils/seed");
      } catch (error) {}
    }
  }
);

mongoose.set("useCreateIndex", true);

app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/task/review", reviewRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/interviews", interviewRouter);
app.use("/api/v1/screener", screenerRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).json({ message: "Page Not Found" });
});

// error handler
app.use(function(err, req, res, next) {
  res.json({ err });
});

module.exports = app;
