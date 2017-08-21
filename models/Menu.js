/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Feb 06, 2017
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.plugin(require('../helpers/AppSchemaPlugin'));

const menuSchema = new mongoose.Schema({
  name: String,
  url: String,
  icon: String,
  onlyAdmin: { type: Boolean, default: false },
  roles: [{ type: Schema.ObjectId, ref: 'Role' }],
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
