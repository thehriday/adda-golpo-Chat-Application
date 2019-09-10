const passport = require('passport');
const User = require('../models/User');

// strategy
require('./localStrategy');
require('./googleStrategy');
require('./facebookStrategy');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      done(null, false);
    })
    .catch(err => {
      done(err);
    });
});
