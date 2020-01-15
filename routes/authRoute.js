const express = require('express');
const authController = require('../controllers/authController');

const {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  getActivationAccount,
  getResetPassword,
  postResetPassword,
  getResetPasswordToken,
  postChangeRestPassword
} = authController;

const isAuthenticated = require('../middleware/isAuthenticated');
const isNotAuthenticated = require('../middleware/isNotAuthenticated');

const router = express.Router();

// signup get and post routes
router.get('/signup', isNotAuthenticated, getSignup);
router.post('/signup', isNotAuthenticated, postSignup);

// login get and post route
router.get('/login', isNotAuthenticated, getLogin);
router.post('/login', isNotAuthenticated, postLogin);

// activation account route
router.get('/activation/:code', isNotAuthenticated, getActivationAccount);

// password reset route
router
  .route('/reset_password')
  .get(isNotAuthenticated, getResetPassword)
  .post(isNotAuthenticated, postResetPassword);

// password reset with code
router.get(
  '/reset_password/token/:passwordResetToken',
  isNotAuthenticated,
  getResetPasswordToken
);
// password rest post route
router.post(
  '/change_reset_password',
  isNotAuthenticated,
  postChangeRestPassword
);

// logout route
router.post('/logout', isAuthenticated, (req, res) => {
  req.logOut();
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
