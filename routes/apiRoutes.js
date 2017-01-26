/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jan 25, 2017
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 'message': 'Great! Here is the first api' });
});

module.exports = router;
