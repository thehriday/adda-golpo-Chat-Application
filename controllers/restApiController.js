const User = require('../models/User');
const Message = require('../models/Message');

exports.getFriendList = (req, res) => {
  User.findById(req.user._id, ['friendList'])
    .populate('friendList', [
      'name',
      'username',
      'email',
      'photoLink',
      'isActive'
    ])
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
  let { dataSkipNumber } = req.body;
  let sendDataPerReq = 10;

  if (!receiverId)
    return res.status(400).json({ msg: 'please include receiver id' });

  if (!dataSkipNumber) {
    dataSkipNumber = sendDataPerReq;
  }

  const peerId = [...senderId, ...receiverId].sort().join('');

  Message.countDocuments({ peerId }, (error, count) => {
    if (error) return next(error);
    const skipAmount = count > dataSkipNumber ? count - dataSkipNumber : 0;
    const finalSkipAmount =
      dataSkipNumber > count + sendDataPerReq ? count : skipAmount;
    sendDataPerReq = skipAmount === 0 ? count % sendDataPerReq : sendDataPerReq;

    Message.find({ peerId })
      .skip(finalSkipAmount)
      .limit(sendDataPerReq)
      .populate('sender', ['name', 'username', 'email', 'photoLink'])
      .then(result => {
        res.status(200).json({ totalMessages: count, data: result });
      })
      .catch(err => next(err));
  });
};
