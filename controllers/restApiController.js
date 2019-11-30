const User = require('../models/User');
const Message = require('../models/Message');

exports.getFriendList = (req, res) => {
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
};

exports.getMessages = (req, res, next) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;
  if (!receiverId)
    return res.status(400).json({ msg: 'please include receiver id' });

  const peerId = [...senderId, ...receiverId].sort().join('');

  Message.find({ peerId })
    .populate('sender', ['name', 'username', 'email', 'photoLink'])
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => next(err));
};
