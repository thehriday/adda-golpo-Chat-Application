const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// strategy
require('./localStrategy');
require('./googleStrategy');
require('./facebookStrategy');

passport.serializeUser((user, done) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_CODE);
  done(null, { id: user.id, token });
});

passport.deserializeUser(({ id }, done) => {
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
