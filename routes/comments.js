const express = require("express");

const router = express.Router();

const commentController = require("../controller/comments_controller");

router.post("/create", commentController.create);

module.exports = router;
