/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Feb 07, 2017
 */

module.exports = (req, res, next) => {
  if (req.user) {
    const user = req.user;
    if (user.admin) {
      return next();
    }

    const roles = user.roles;

    console.log(`AdminMenuMiddleware: ${req.path}, roles: ${roles}`);
    next();
  } else {
    req.redirect('/login');
  }
};
