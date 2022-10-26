const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Comment.create({
    content: req.body.content,
  });
};
