const mongoose = require("mongoose");
const multer = require("multer");

const path = require("path");

const AVATAR_PATH = path.join("/upload/users/avatar");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
