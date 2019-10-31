const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    (accessToken, refreshToken, profile, done) => {
      const { name, email, picture } = profile._json;
      User.findOne({ email })
        .then(async user => {
          if (user) {
            return user;
          }
          const username = name.replace(/ /g, '').toLowerCase();
          const userExists = await User.findOne({ username });

          const newUser = new User({
            name,
            email,
            photoLink: picture
          });
          if (userExists) {
            newUser.username = Date.now();
          } else {
            newUser.username = username;
          }
          return newUser.save();
        })
        .then(userData => {
          done(null, userData);
        })
        .catch(err => done(err));
    }
  )
);
