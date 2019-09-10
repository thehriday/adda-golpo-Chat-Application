const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cloudinary = require('../util/cloudinary');

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
      const { name, picture, email } = profile._json;
      User.findOne({ email })
        .then(async user => {
          if (user) {
            return user;
          }
          let username = name.replace(/ /g, '').toLowerCase();
          const isUserNameExistsPromise = User.findOne({ username });
          const photoPromise = cloudinary.uploader.upload(
            `https://graph.facebook.com/${profile._json.id}/picture?type=large`
          );
          const [isUserNameExists, photo] = await Promise.all([
            isUserNameExistsPromise,
            photoPromise
          ]);
          if (isUserNameExists) {
            username = Date.now();
          }

          const newUser = new User({
            name,
            username,
            email,
            photoLink: photo.secure_url
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
