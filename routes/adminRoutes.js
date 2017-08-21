/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Feb 06, 2017
 */
const express = require('express');
const router = express.Router();
const R = require('../configs/urls').urls;

const dashboardController = require('../controllers/DashboardController');
const userController = require('../controllers/UserController');

router.get(R.ROOT, dashboardController.index);
router.get(R.ADMIN.GET_USERS, userController.getUsers);
router.get(R.ADMIN.GET_MENUS, userController.getUsers);

module.exports = router;
