const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const compression = require("compression");
require("dotenv").config();
const auth = require("./routes/api/auth");
const budget = require("./routes/api/budget");
const expense = require("./routes/api/expense");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

// Compression Middlware
app.use(compression());

// Morgan Middleware
app.use(morgan("dev"));

// Cookie Parsor Middleware
app.use(cookieParser());

// Cors Middleware
app.use(cors());

// Route Middleware
app.use("/api/auth", auth);
app.use("/api/budget", budget);
app.use("/api/expense", expense);

module.exports = app;
