const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/User');

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, resetToken, profile, done) {
      console.log(profile);
      const { name, picture, email } = profile._json;

      User.findOne({ email })
        .then(async user => {
          if (user) {
            return user;
          }

          let username = name.replace(/ /g, '').toLowerCase();
          const isUserNameExists = await User.findOne({ username });

          if (isUserNameExists) {
            username = Date.now();
          }

          const newUser = new User({
            name,
            username,
            email,
            photoLink: picture.data.url
          });

          return newUser.save();
        })
        .then(user => {
          done(null, user);
        })
        .catch(err => done(err));
    }
  )
);
