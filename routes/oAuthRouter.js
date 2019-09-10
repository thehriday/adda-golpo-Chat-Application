const express = require('express');

const oAuthController = require('../controllers/oAuthController');

const {
  getOAuthGoogle,
  getOAuthGoogleCallBack,
  getOAuthFacebook,
  getOAuthFacebookCallback
} = oAuthController;

const router = express.Router();

// oauth google hit route
router.get('/google', getOAuthGoogle);

// oauth google callback hit route
router.get('/google/callback', getOAuthGoogleCallBack);

// fb oauth route
router.get('/facebook', getOAuthFacebook);

// fb oauth callback route
router.get('/facebook/callback', getOAuthFacebookCallback);

module.exports = router;
