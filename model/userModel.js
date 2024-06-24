const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// save default username as email address all characters before '@' if username is not provided by user
userSchema.pre("save", function (next) {
  if (!this.username) {
    this.username = this.email.split("@")[0];
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
