module.exports.posts = function (req, res) {
  return res.render("post", {
    title: "Posts",
    post: "Post is up and running!",
  });
};
