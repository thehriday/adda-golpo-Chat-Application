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
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            const newUser = new User({
              name,
              email,
              photoLink: picture,
              username: Date.now()
            });
            return newUser.save();
          }
        })
        .then(userData => done(userData))
        .catch(err => console.log(err));
    }
  )
);
