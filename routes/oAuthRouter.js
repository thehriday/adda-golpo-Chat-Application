const express = require('express');

const oAuthController = require('../controllers/oAuthController');

const router = express.Router();

// oauth google git route
router.get('/google', oAuthController.getOAuthGoogle);

// oauth google callback git route
router.get('/google/callback', oAuthController.getOAuthGoogleCallBack);

module.exports = router;
