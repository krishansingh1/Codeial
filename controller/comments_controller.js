const Comment = require("../models/comment_schema");
const Post = require("../models/post_schema");
const Like = require('../models/like_schema');
const commentsMailer = require("../mailers/comments_mailer");
const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comment_email_worker");

module.exports.create = async function (req, res) {
  try {
    let post = await Posts.findById(req.body.post);

    if (post) {
      let comment = await Comments.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      comment = await comment.populate("user", "name email");

      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("Error in sending to the queue", err);
          return;
        }
        console.log("Job enqueued", job.id);
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created!",
        });
      }

      req.flash("success", "Comment Published!");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comments.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      let post = Posts.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("success", "Comment deleted!");
      return res.redirect("back");

    } else {
      req.flash("error", "Unauthorized");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};
