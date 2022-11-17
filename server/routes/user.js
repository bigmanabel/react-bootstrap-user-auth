const express = require('express');

const router = express.Router();

const {
    loginUser,
    registerUser
} = require('../controllers/user.controller');

// Login Route
router.post('/login', loginUser);

// Register Route
router.post('/register', registerUser);

module.exports = router;