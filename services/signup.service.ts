const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ifExist = await User.findOne({ email: email });
    if (ifExist) {
      return res.send(`
        <h1>User already exist</h1>
        <a href="/signup">Go back</a>
        `);
    }
    const user = new User({
      email: email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    await user.save();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.send(`
        <h1>Something went wrong</h1>
        <a href="/signup">Go back</a>
        `);
  }
};
