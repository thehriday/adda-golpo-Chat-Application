const mongoose = require('mongoose');
const validator = require('validator');

const User = require('../models/User');

exports.getSearchUser = (req, res, next) => {
  const { user } = req.query;
  let searchResult;
  if (!user) {
    return res.render('error/noUserFound', { title: 'No User Found' });
  }
  if (validator.isEmail(user)) {
    searchResult = User.findOne({ email: RegExp(user, 'i') }, ['-password']);
  } else {
    searchResult = User.findOne({ username: RegExp(user, 'i') }, [-'password']);
  }
  searchResult
    .then(searchUser => {
      if (!searchUser) {
        return res.render('error/noUserFound', {
          searchName: user,
          title: 'No User Found'
        });
      }
      const alreadyFriend = req.user.friendList.includes(searchUser._id);
      const sendRequest = req.user.sendRequest.includes(searchUser._id);
      const friendRequest = req.user.friendRequest.includes(searchUser._id);

      res.render('searchUser/searchUser', {
        title: user,
        userId: searchUser._id,
        searchName: user,
        searchUser,
        alreadyFriend,
        sendRequest,
        friendRequest
      });
    })
    .catch(err => {
      next(err);
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

exports.getFriendrequest = (req, res, next) => {
  User.findOne({ _id: req.user }, ['friendRequest'])
    .populate('friendRequest', ['-password'])
    .then(allRequest => {
      res.render('friendRequest/friendRequest', {
        friendRequest: allRequest.friendRequest
      });
    })
    .catch(err => next(err));
};

exports.postAcceptRequest = (req, res, next) => {
  const { userId } = req.body;
  req.user.friendRequest = req.user.friendRequest.filter(
    requestId => requestId.toString() !== userId
  );
  req.user.friendList = [...req.user.friendList, userId];

  const curentUser = req.user.save();
  const targetUser = User.updateOne(
    { _id: userId },
    { $push: { friendList: req.user }, $pullAll: { sendRequest: [req.user] } }
  );
  Promise.all([curentUser, targetUser])
    .then(result => {
      exports.postDeleteRequest(req, res, next);
    })
    .catch(err => {
      next(err);
    });
};

exports.postDeleteRequest = (req, res, next) => {
  const { userId } = req.body;

  req.user.friendRequest = req.user.friendRequest.filter(
    requestId => requestId.toString() !== userId
  );
  const curentUser = req.user.save();
  const targetUser = User.updateOne(
    { _id: userId },
    { $pullAll: { sendRequest: [req.user] } }
  );
  Promise.all([curentUser, targetUser])
    .then(result => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
};
