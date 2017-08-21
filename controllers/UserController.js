/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Feb 06, 2017
 */

const User = require('../models/User');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Welcome to NodeJS-KickStart',
  });
};

exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    const model = { title: 'User List' };
    if (err) {
      req.flash('errors', err.message);
    } else {
      model.users = users;
    }
    res.render('admin/users', model);
  });
};
