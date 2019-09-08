const { randomBytes } = require('crypto');
const signupValidation = require('../util/validation/signupValidation');
const User = require('../models/User');

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
      console.log(userData);
      req.flash('signup_success', true);
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
};
