/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jan 26, 2017
 */
const request = require('supertest');
const app = require('../app.js');
const R = require('../configs/urls').urls;
const API = require('../configs/urls').api;

describe(`GET ${R.ROOT}`, () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get(R.ROOT)
      .expect(200, done);
  });
});

describe(`GET ${R.SIGN_IN}`, () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get(R.SIGN_IN)
      .expect(200, done);
  });
});

// describe(`GET ${R.SIGN_UP}`, () => {
//   it('should return 200 OK', (done) => {
//     request(app)
//       .get(R.SIGN_UP)
//       .expect(200, done);
//   });
// });

describe(`GET ${API.ROOT}`, () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get(API.ROOT)
      .expect(200, done);
  });
});

describe('GET /random-url', () => {
  it('should return 404', (done) => {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});
