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
    console.log(req.flash);
    return res.redirect('back');
  }
  // console.log(validationResult);
  const { name, username, email, password } = validationResult;
  const isEmailExists = User.findEmail(email);
  const isUserNameExists = User.findUsername(username);

  if (isEmailExists) {
    req.flash('emailExists', 'Email is already taken.');
    console.log(req.flash[0]);
    return res.redirect('back');
  }

  if (isUserNameExists) {
    req.flash('isUserNameExists', 'Username is already taken.');
    console.log(req.flash[0]);
    return res.redirect('back');
  }

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
