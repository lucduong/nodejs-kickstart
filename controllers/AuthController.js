/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jan 25, 2017
 */
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
const R = require('../configs/urls').urls;

/**
 * GET /signin
 * SignIn page.
 */
exports.getSignIn = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('auth/signIn', {
    title: 'Sign In'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postSignIn = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect(R.SIGN_IN);
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', info);
      return res.redirect(R.SIGN_IN);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || R.ROOT);
    });
  })(req, res, next);
};

/**
 * GET /signOut
 * Sign out.
 */
exports.signOut = (req, res) => {
  req.logout();
  res.redirect(R.ROOT);
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect(R.ROOT);
  }
  res.render('auth/signUp', {
    title: 'Create Account'
  });
};
