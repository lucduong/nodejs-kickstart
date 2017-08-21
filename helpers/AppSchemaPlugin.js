/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Feb 06, 2017
 */

const AppSchemaPlugin = (schema, options) => {
  schema.add({ deleteFlag: { type: Boolean, default: false } });
  schema.add({ activeFlag: { type: Boolean, default: false } });

  if (options && options.index) {
    schema.path('deleteFlag').index(options.index);
    schema.path('activeFlag').index(options.index);
  }
};

module.exports = AppSchemaPlugin;
