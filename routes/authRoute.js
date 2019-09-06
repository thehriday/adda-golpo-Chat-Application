const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// signup get and post routes
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
