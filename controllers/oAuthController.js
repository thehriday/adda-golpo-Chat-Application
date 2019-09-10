const passport = require('passport');

exports.getOAuthGoogle = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.getOAuthGoogleCallBack = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/'
});

// facebook oAuthController
exports.getOAuthFacebook = passport.authenticate('facebook', {
  scope: ['email']
});

exports.getOAuthFacebookCallback = passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
});
