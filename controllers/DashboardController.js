/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Feb 06, 2017
 */
/**
 * GET /
 * Dashboard
 */
exports.index = (req, res) => {
  res.render('admin/dashboard', {
    title: 'Dashboard',
  });
};
