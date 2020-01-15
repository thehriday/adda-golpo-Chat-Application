const express = require('express');

const { getSuccessMsg } = require('../controllers/successMsgController');

const isNotAuthenticated = require('../middleware/isNotAuthenticated');

const router = express.Router();

// show signup success
router.get('/success_message', isNotAuthenticated, getSuccessMsg);

module.exports = router;
