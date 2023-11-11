const express = require('express');
const usersController = require('../controllers/usersControllers');
const router = express.Router();

router.post('/login', usersController.loginUser);
router.post('/register', usersController.registerUser);

module.exports = router;
