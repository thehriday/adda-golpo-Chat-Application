const passport = require('passport');
const User = require('../models/User');

// strategy
require('./localStrategy');
require('./googleStrategy');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if (user) {
        done(null, user);
      }
    })
    .catch(err => {
      console.log(err);
    });
});
