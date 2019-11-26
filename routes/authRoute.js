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

const router = express.Router();

// signup get and post routes
router.get('/signup', getSignup);
router.post('/signup', postSignup);

// login get and post route
router.get('/login', getLogin);
router.post('/login', postLogin);

// activation account route
router.get('/activation/:code', getActivationAccount);

// password reset route
router
  .route('/reset_password')
  .get(getResetPassword)
  .post(postResetPassword);

// password reset with code
router.get('/reset_password/token/:passwordResetToken', getResetPasswordToken);
// password rest post route
router.post('/change_reset_password', postChangeRestPassword);

// logout route
router.post('/logout', (req, res) => {
  req.logOut();
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
