require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

const app = express();

const { PORT, MONGODB_URI, TOKEN_SECRET } = process.env;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// connecting to mongodb
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    // console log the port number
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// using connect-mongo and express-session to store user session in mongodb
const MongoStore = require("connect-mongo");
const session = require("express-session");
app.use(
  session({
    secret: TOKEN_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);

// initialize passport
const passport = require("passport");
require("./config/passport-config");
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", indexRoutes);
app.use("/", authRoutes);
