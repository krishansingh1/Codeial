const express = require("express");

const router = express.Router();

const postsController = require("../controller/posts_controller");

router.get("/post", postsController.posts);

module.exports = router;
