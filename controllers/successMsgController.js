exports.getSuccessMsg = (req, res) => {
  const { name } = req.query;
  if (name === 'signup') {
    res.render('success_msg/signupSuccess');
  } else if (name === 'reset_password') {
    res.render('success_msg/forgotPasswordSuccess');
  } else {
    res.render('error/404');
  }
};
