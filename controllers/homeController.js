const User = require('../models/User');

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.user._id, ['friendList'])

      .then(user => console.log(user))
      .catch(err => next(err));

    res.render('homepage/authHomePage', { title: `Welcome ${req.user.name}` });
  } else {
    res.render('homepage/unAuthHomePage');
  }
};
