const express = require("express");

const router = express.Router();

const userController = require("../controller/users_controller");

router.get("/signUp", userController.signUp);
router.get("/signIn", userController.signIn);
router.post("/create", userController.create);

module.exports = router;
