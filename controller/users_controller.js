const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "Profile",
      profile_user: user,
    });
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
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
  //Find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding in signing in");
      return;
    }

    //Handle User found
    if (user) {
      //Handle password which doesn't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }

      //handle session creation
      res.cookie("user_id", user.id);
      req.flash("success", "Logged in Successfully");
      return res.redirect("/");
    } else {
      //handle user not found
      return res.redirect("back");
    }
  });
};

module.exports.signOut = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out");
    res.redirect("/users/signIn");
  });
};
