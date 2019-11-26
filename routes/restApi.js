const express = require('express');
const isAuth = require('../middleware/rest_api/isAuth');
const User = require('../models/User');

const router = express.Router();

router.get('/friend-list', isAuth, (req, res) => {
  User.findById(req.user._id, ['friendList'])
    .populate('friendList', ['name', 'username', 'email', 'photoLink'])
    .then(result => {
      if (!result) throw new Error('User for found');
      res.status(200).json({
        msg: 'friend list',
        friendList: result.friendList,
        userId: req.user._id
      });
    })
    .catch(err => {
      res.status(400).json({ msg: 'User not found' });
    });
});

module.exports = router;
