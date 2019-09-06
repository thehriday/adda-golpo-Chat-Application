const signupValidation = require('../util/validation/signupValidation');
const User = require('../models/User');

// signup get controller
exports.getSignup = (req, res) => {
  res.render('signup', { title: 'Please SignUp' });
};

// signup post controller
exports.postSignup = (req, res) => {
  const validationResult = signupValidation(req.body);

  if (validationResult.errors) {
    req.flash.errors = validationResult.errors;
    res.redirect('back');
  }
  // console.log(validationResult);
  const { name, username, email, password } = validationResult;

  const user = new User({
    name,
    username,
    email,
    password
  });

  user
    .save()
    .then(userData => console.log(userData))
    .catch(err => {
      console.log(err);
    });
};
