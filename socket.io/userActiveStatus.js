const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

mongoose.set('useFindAndModify', false);

const { USER_ACTIVE_STATUS } = require('./emitType');

module.exports = io => {
  io.on('connection', socket => {
    socket.on(USER_ACTIVE_STATUS, info => {
      try {
        const { token, isActive } = info;
        const user = jwt.decode(token, process.env.SECRET_CODE);
        if (!user) return;
        User.findByIdAndUpdate(user._id, { isActive })
          .then(() => {
            io.emit(`active-status ${user._id}`, isActive);
          })
          .catch(err => console.log(err));
      } catch (err) {
        console.log(err);
      }
    });
  });
};
