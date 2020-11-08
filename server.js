const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const compression = require("compression");
require("dotenv").config();
const PORT = 5000 || process.env.PORT;
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

// Route Middleware
app.use("/api/auth", auth);
app.use("/api/budget", budget);
app.use("/api/expense", expense);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Listening at Port: ${PORT}`);
});
