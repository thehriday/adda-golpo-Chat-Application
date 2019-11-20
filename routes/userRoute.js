const express = require('express');

const router = express.Router();

// settings route
router.get('/settings', (req, res) => {
  res.send('settings');
});

// user profile route
router.get('/user/:username', (req, res) => {
  res.json(req.params);
});

module.exports = router;
