const express = require('express');

const { getSuccessMsg } = require('../controllers/successMsgController');

const router = express.Router();

// show signup success
router.get('/success_message', getSuccessMsg);

module.exports = router;
