const { randomBytes } = require('crypto');
const passport = require('passport');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const signupValidation = require('../util/validation/signupValidation');
const User = require('../models/User');
const signupMail = require('../util/sendmail/signupMail');
const resetPasswordMail = require('../util/sendmail/resetPasswordMail');

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
    req.flash('error', validationResult.errors);
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
    .then(() => res.redirect('/success_message?name=signup'))
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

exports.getResetPassword = (req, res) => {
  res.render('auth/reset-password', { title: 'Rest Your Password' });
};

exports.postResetPassword = async (req, res, next) => {
  const { usernameOrEmail } = req.body;
  const isEmpty = validator.isEmpty(usernameOrEmail);

  if (isEmpty) {
    req.flash('error', ['Username or Email is required.']);
    return res.redirect('back');
  }

  const isEmail = validator.isEmail(usernameOrEmail);
  let user;
  if (isEmail) {
    user = await User.findOne({ email: usernameOrEmail });
  } else {
    user = await User.findOne({ username: usernameOrEmail });
  }
  // check user exist or not
  if (user) {
    user.passwordResetToken = randomBytes(25).toString('hex');
    user.passwordResetTime = Date.now() + 1000 * 60 * 60 * 24;
    user
      .save()
      .then(() => {
        return resetPasswordMail({
          name: user.name,
          to: user.email,
          link: `${process.env.SITE_URL}/reset_password/token/${user.passwordResetToken}`
        });
      })
      .then(() => {
        res.redirect('/success_message?name=reset_password');
      })
      .catch(err => next(err));
  } else {
    req.flash('error', ['No user found with this username or Email']);
    res.redirect('back');
  }
};

// reset password with code callback

exports.getResetPasswordToken = (req, res, next) => {
  const { passwordResetToken } = req.params;
  User.findOne({
    passwordResetToken,
    passwordResetTime: { $gt: Date.now() }
  })
    .then(user => {
      if (user) {
        res.render('auth/changeForgetPassword', { passwordResetToken });
      } else {
        req.flash('error', [
          'Your Token is Invalid or Token has been Expired. Try Again'
        ]);
        res.redirect('/reset_password');
      }
    })
    .catch(err => {
      next(err);
    });
};

exports.postChangeRestPassword = (req, res, next) => {
  const { password, passwordResetToken } = req.body;
  if (password.length < 6) {
    req.flash('error', ['Password should be at least 6 characters.']);
    return res.redirect('back');
  }
  User.findOne({ passwordResetToken })
    .then(user => {
      if (user) {
        bcrypt.hash(password, 10, (err, hasPassword) => {
          if (err) throw err;
          user.password = hasPassword;
          user.passwordResetToken = null;
          return user.save();
        });
        req.redirect('/login');
      }
    })
    .then(user => {
      req.flash('success', ['Your password has successfully changed']);
      res.redirect('/login');
    })
    .catch(err => next(err));
};
