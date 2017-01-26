/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jan 24, 2017
 */
const User = require('../models/User');

const _createUsers = () => {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const admin = new User({
      email: 'admin@ltv.vn',
      username: 'admin',
      password: '123789',
      profile: {
        name: 'Administrator',
        gender: 'Male',
        phone: '+84932626007',
      },
      deleteFlag: false,
      activeFlag: true,
      admin: true,
      publish: false,
    });

    User.create([admin], (error) => {
      if (!error) {
        console.log('The first Users were created successfully!');
      }
    });
  });
};

module.exports = {
  createUsers: _createUsers
};
