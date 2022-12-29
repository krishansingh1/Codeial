const express = require('express');
const router = express.Router();
const addController = require('../controller/add_controller');

router.post('/add_toggle', addController.addToggle);

module.exports = router;