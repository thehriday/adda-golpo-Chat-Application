const signupValidation = require('../util/validation/signupValitation');
// signup get controller
exports.getSignup = (req, res) => {
  res.render('signup', { title: 'Please SignUp' });
};

// signup post controller
exports.postSignup = (req, res) => {
  const validationResult = signupValidation(req.body);

  // if (validationResult.errors.length > 0) {
  //   req.flash.errors = validationResult.errors;
  //   res.redirect('back');
  // }
  console.log(validationResult);
};
