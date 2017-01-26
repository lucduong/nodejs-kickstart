/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jan 25, 2017
 */
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController');
const authController = require('../controllers/AuthController');
const R = require('../configs/urls').urls;

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('../configs/passport');
const RequireAuthenticated = passportConfig.isAuthenticated;

router.get(R.ROOT, homeController.index);

router.get(R.SIGN_IN, authController.getSignIn);
router.post(R.SIGN_IN, authController.postSignIn);
router.get(R.SIGN_OUT, authController.signOut);

module.exports = router;
