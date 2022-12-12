const passport = require("passport");

const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");

const User = require("../models/user");

//tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "819625955536-29pfguf07vn491jr3p6uc9o85c0l0l2g.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in google startegy-passport", err);
          return;
        }
        console.log(profile);

        if (user) {
          //if found, set this user as req.user
          return done(null, user);
        } else {
          //if not found, create the user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "Error in creating user google startegy-passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
