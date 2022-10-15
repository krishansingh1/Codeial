const express = require("express");

const router = express.Router();

const userController = require("../controller/users_controller");

router.get("/profile", userController.profile);
router.get("/signUp", userController.signUp);
router.get("/signIn", userController.signIn);
router.post("/create", userController.create);
router.post("/create-session", userController.createSession);
router.get("/delete", userController.delete);

module.exports = router;
