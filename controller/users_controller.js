const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("home", {
    title: "Profile",
  });
};

module.exports.signUp = function (req, res) {
  // return res.end("<h1>User Controller is up and runinn!</h1>");
  // console.log(req.cookies);

  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("signUp", {
    title: "Codeial | SignUp",
  });
};

module.exports.signIn = function (req, res) {
  // return res.end("<h1>Profile 2 Controller is up and runinn!</h1>");
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("signIn", {
    title: "Codeial | SignIn",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user while signing up");
          return;
        }
        return res.redirect("/users/signIn");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.signOut = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/users/signIn");
  });
};
