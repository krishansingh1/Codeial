const express = require("express");

const router = express.Router();

const userController = require('../controller/users_controller');

router.get('/', userController.forgot);
router.post('/reset_password', userController.resetPassword);
router.get('/getPassword', userController.getPassword);
router.post('/changePassword/:id', userController.changePassword);

module.exports = router;