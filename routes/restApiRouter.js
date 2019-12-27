const express = require('express');
const isAuth = require('../middleware/rest_api/isAuth');

const {
  getFriendList,
  getMessages,
  postUserActiveStatus
} = require('../controllers/restApiController');

const router = express.Router();

router.get('/friend-list', isAuth, getFriendList);

router.post('/get-messages', isAuth, getMessages);

module.exports = router;
