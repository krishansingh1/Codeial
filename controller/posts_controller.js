const Post = require("../models/post_schema");
const Comment = require("../models/comment_schema");
const Like = require('../models/like_schema');

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    console.log('Post Controller', post);
    if (req.xhr) {
      post = await post.populate("user", "name");

      return res.status(200).json({
        data: {
          post: post,
          user: req.user,
        },
        message: "Post created!",
      });
    }

    // req.flash("success", "Post created successfully");
    // return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      Like.deleteMany({ likeable: post, onModel: "Post" });
      Like.deleteMany({ _id: { $in: post.comment } })
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.parms.id,
          },
          message: "Post deleted",
        });
      }

      return res.redirect("back");

    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
