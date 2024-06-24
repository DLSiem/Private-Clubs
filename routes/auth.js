const express = require("express");
const passport = require("passport");
const signupService = require("../services/signup.service.ts");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", signupService);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
