const passport = require('passport');

exports.getOAuthGoogle = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.getOAuthGoogleCallBack = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/'
});
