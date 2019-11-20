const express = require('express');

const {
  getSearchUser,
  postSendRequest,
  postCancelRequest,
  getFriendrequest,
  postAcceptRequest,
  postDeleteRequest
} = require('../controllers/authUserController');

const router = express.Router();

// settings route
router.get('/settings', (req, res) => {
  res.send('settings');
});

// user profile route
router.get('/user/:username', (req, res) => {
  res.json(req.params);
});

router.get('/search', getSearchUser);

// send friend request
router.post('/send-request', postSendRequest);

// calcel friend request
router.post('/cancel-request', postCancelRequest);

// friend request route
router.get('/friend_request', getFriendrequest);

// accept friend request route
router.post('/accept-friend-request', postAcceptRequest);

// delete friend request route
router.post('/delete-friend-request', postDeleteRequest);

module.exports = router;
