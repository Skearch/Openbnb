const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authenticationController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;