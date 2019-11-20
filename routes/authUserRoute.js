const express = require('express');

const {
  getSearchUser,
  postSendRequest,
  postCancelRequest
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

module.exports = router;
