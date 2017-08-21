/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jan 24, 2017
 */
const User = require('../models/User');
const Role = require('../models/Role');
const Menu = require('../models/Menu');
const R = require('../configs/urls').urls;

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
    });

    User.create([admin], (error) => {
      if (!error) {
        console.log('The first Users were created successfully!');
      }
    });
  });
};

const _createRoles = () => {
  return new Promise((resolve, reject) => {
    Role.count().exec((err, count) => {
      if (count > 0) {
        resolve();
        return;
      }

      const everyone = new Role({
        name: 'Everyone',
        deleteFlag: false,
        activeFlag: true,
      });

      const admin = new Role({
        name: 'Admin',
        deleteFlag: false,
        activeFlag: true,
      });

      Role.create([everyone, admin], (err, data) => {
        if (!err) {
          console.log('The first roles were created successfully!');
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  });
};

const _createMenus = () => {
  Menu.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const menuMgmt = new Menu({
      name: 'Menu Management',
      url: R.ADMIN.GET_MENUS,
      icon: 'fa fa-desktop',
      onlyAdmin: true,
      roles: [],
    });

    Menu.create([menuMgmt], (err) => {
      if (!err) {
        console.log('The first menus were created successfully!');
      }
    });
  });
};

module.exports = {
  createUsers: _createUsers,
  createMenus: _createMenus,
};
