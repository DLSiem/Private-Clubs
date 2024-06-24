const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const authenticateUser = async (email, password, done) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  authenticateUser
);
passport.use(strategy);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
