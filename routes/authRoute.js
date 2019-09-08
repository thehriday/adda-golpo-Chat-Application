const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// signup get and post routes
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

// login get and post route
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// show signup success
router.get('/signup_success', (req, res) => {
  res.render('auth/signupSuccess');
});

module.exports = router;
