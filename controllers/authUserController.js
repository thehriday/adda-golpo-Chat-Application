const mongoose = require('mongoose');
const validator = require('validator');

const User = require('../models/User');
const FriendList = require('../models/FriendList');

exports.getSearchUser = (req, res) => {
  const { user } = req.query;
  let searchResult;
  if (!user) {
    return res.render('error/noUserFound', { title: 'No User Found' });
  }
  if (validator.isEmail(user)) {
    searchResult = User.findOne({ email: user });
  } else {
    searchResult = User.findOne({ username: user });
  }
  searchResult.then(async searchUser => {
    if (!searchUser) {
      return res.render('error/noUserFound', {
        searchName: user,
        title: 'No User Found'
      });
    }
    const alreadyFriend = req.user.friendList.includes(searchUser._id);
    const sendRequest = req.user.sendRequest.includes(searchUser._id);

    res.render('searchUser/searchUser', {
      searchName: user,
      searchUser,
      alreadyFriend,
      sendRequest,
      title: user
    });
  });
};

exports.postSendRequest = (req, res, next) => {
  const { searchUser } = req.body;
  req.user.sendRequest = [...req.user.sendRequest, searchUser];
  const curentUser = req.user.save();
  const targetUser = User.updateOne(
    { _id: searchUser },
    { $push: { friendRequest: req.user } }
  );
  Promise.all([curentUser, targetUser])
    .then(result => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
};

exports.postCancelRequest = (req, res, next) => {
  const { searchUser } = req.body;

  req.user.sendRequest = req.user.sendRequest.filter(
    requestId => requestId.toString() !== searchUser
  );
  const curentUser = req.user.save();
  const targetUser = User.updateOne(
    { _id: searchUser },
    { $pullAll: { friendRequest: [req.user] } }
  );
  Promise.all([curentUser, targetUser])
    .then(result => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
};
