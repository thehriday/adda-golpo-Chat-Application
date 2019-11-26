module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.cookie('token', req.session.passport.user.token, {
      maxAge: 1000 * 60 * 60 * 24 * 30
    });
    res.render('homepage/authHomePage', { title: `Welcome ${req.user.name}` });
  } else {
    res.render('homepage/unAuthHomePage');
  }
};
