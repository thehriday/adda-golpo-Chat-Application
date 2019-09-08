const { randomBytes } = require('crypto');
const passport = require('passport');

const signupValidation = require('../util/validation/signupValidation');
const User = require('../models/User');
const signupMail = require('../util/sendmail/signupMail');

// signup get controller
exports.getSignup = (req, res) => {
  res.render('signup', {
    title: 'Please SignUp',
    signup_success: req.flash('signup_success')[0]
  });
};

// signup post controller
exports.postSignup = async (req, res, next) => {
  const validationResult = await signupValidation(req.body);

  if (validationResult.errors) {
    req.flash('errors', validationResult.errors);
    return res.redirect('back');
  }

  const { name, username, email, password } = validationResult;

  const user = new User({
    name,
    username,
    email,
    password,
    emailValidationCode: randomBytes(20).toString('hex')
  });

  user
    .save()
    .then(userData => {
      signupMail({
        name: userData.name,
        to: userData.email,
        link: `${process.env.SITE_URL}/validation/${userData.emailValidationCode}`
      })
        .then(() => console.log('SENT'))
        .catch(err => {
          console.log(err);
        });
      req.flash('signup_success', true);
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
};

// login get controller
exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

// login post controller
exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});
