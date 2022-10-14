const User = require("../models/user");

module.exports.signUp = function (req, res) {
  // return res.end("<h1>User Controller is up and runinn!</h1>");
  console.log(req.cookies);
  return res.render("signUp", {
    title: "Codeial | SignUp",
  });
};

module.exports.signIn = function (req, res) {
  // return res.end("<h1>Profile 2 Controller is up and runinn!</h1>");
  return res.render("signIn", {
    title: "Codeial | SignIn",
  });
};

module.exports.create = function (req, res) {
  if (req.body.Password != req.body.Confirm_password) {
    return res.redirect("/users/signUp");
  }

  User.findOne({ email: req.body.Email }, function (err, user) {
    if (err) {
      console.log("Error in finding user ins igning up");
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

module.exports.createSession = function (req, res) {};
