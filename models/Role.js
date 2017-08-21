/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Feb 06, 2017
 */

const mongoose = require('mongoose');
mongoose.plugin(require('../helpers/AppSchemaPlugin'));
const Schema = mongoose.Schema;
const relationship = require("mongoose-relationship");

const roleSchema = new mongoose.Schema({
  name: String,
  menus: [{ type: Schema.ObjectId, ref: 'Menu', childPath: 'roles' }],
  users: [{ type: Schema.ObjectId, ref: 'User', childPath: 'roles' }],
}, { timestamps: true });

roleSchema.plugin(relationship, { relationshipPathName: ['menus', 'users'] });
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
