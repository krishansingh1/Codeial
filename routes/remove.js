const express = require("express");
const router = express.Router();

const removeController = require('../controller/remove_controller');

router.post('/remove_toggle', removeController.removeToggle);

module.exports = router;