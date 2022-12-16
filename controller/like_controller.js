const Post = require('../models/post_schema');

const Comment = require('../models/comment_schema');

const Like = require('../models/like_schema');

module.exports.toggleLike = async function (req, res) {
    try {
        let liked;
        let deleted = false;

        if (req.query.type == "Post") {
            liked = await Post.findById(req.query.id).populate('likes');
        } else {
            liked = await Comment.findById(req.query.id).populate('likes');
        }

        let exitingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type,
        });

        if (exitingLike) {
            liked.likes.pull(exitingLike._id);
            liked.save();
            exitingLike.remove();
            deleted = true;
        } else {
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type,
            });
            console.log('before', liked);
            liked.likes.push(newLike._id);
            console.log('after', liked.likes[0]);
            liked.save();
        }

        return res.status(200).json({
            message: 'success',
            data: {
                deleted: deleted,
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err,
        })
    }
}