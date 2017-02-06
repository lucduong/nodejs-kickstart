/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Feb 06, 2017
 */
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');
const R = require('../configs/urls').urls;

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('../configs/passport');
const RequireAuthenticated = passportConfig.isAuthenticated;

router.get(R.ROOT, RequireAuthenticated, dashboardController.index);

module.exports = router;
