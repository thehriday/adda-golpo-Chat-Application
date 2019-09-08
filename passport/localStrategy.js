const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

passport.use(
  new LocalStrategy(
    { usernameField: 'emailOrUsername' },
    async (emailOrUsername, password, done) => {
      let user;
      if (validator.isEmail(emailOrUsername)) {
        user = await User.findOne({ email: emailOrUsername });
      } else {
        user = await User.findOne({ username: emailOrUsername });
      }
      if (user) {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            if (!user.emailValidationCode) {
              done(err, user);
            } else {
              done(
                null,
                false,
                'Your Account is not Active. To active your account check your Email.'
              );
            }
          } else {
            done(null, false, 'Password is not valid');
          }
        });
      } else {
        done(null, false, 'Email or Username is not valid');
      }
    }
  )
);
