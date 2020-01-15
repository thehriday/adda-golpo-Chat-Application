const express = require('express');

const oAuthController = require('../controllers/oAuthController');

const {
  getOAuthGoogle,
  getOAuthGoogleCallBack,
  getOAuthFacebook,
  getOAuthFacebookCallback
} = oAuthController;

const isNotAuthenticated = require('../middleware/isNotAuthenticated');

const router = express.Router();

// oauth google hit route
router.get('/google', isNotAuthenticated, getOAuthGoogle);

// oauth google callback hit route
router.get('/google/callback', isNotAuthenticated, getOAuthGoogleCallBack);

// fb oauth route
router.get('/facebook', isNotAuthenticated, getOAuthFacebook);

// fb oauth callback route
router.get('/facebook/callback', isNotAuthenticated, getOAuthFacebookCallback);

module.exports = router;
