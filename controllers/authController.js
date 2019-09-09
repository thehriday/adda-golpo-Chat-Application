const { randomBytes } = require('crypto');
const passport = require('passport');

const signupValidation = require('../util/validation/signupValidation');
const User = require('../models/User');
const signupMail = require('../util/sendmail/signupMail');

// signup get controller
exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    title: 'Please SignUp'
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
      return signupMail({
        name: userData.name,
        to: userData.email,
        link: `${process.env.SITE_URL}/activation/${userData.emailValidationCode}`
      });
    })
    .then(() => res.redirect('/signup_success'))
    .catch(err => next(err));
};

// login get controller
exports.getLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

// login post controller
exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

// activation account controller
exports.getActivationAccount = (req, res, next) => {
  const { code } = req.params;
  User.findOne({ emailValidationCode: code })
    .then(user => {
      if (!user) {
        return res.render('error/404');
      }

      user.emailValidationCode = '';
      return user.save();
    })
    .then(user => {
      if (user) {
        req.session.passport = { user: user.id };
        res.redirect('/');
      }
    })
    .catch(err => next(err));
};
