const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/users_controller");

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/signUp", userController.signUp);
router.get("/signIn", userController.signIn);
router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signIn" }),
  userController.createSession
);

router.get("/signOut", userController.signOut);

module.exports = router;
