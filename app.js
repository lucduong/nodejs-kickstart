/**
 * Copyright © 2016 LTV Co., Ltd. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jan 24, 2017
 */

const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const logger = require('morgan');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const chalk = require('chalk');
const seeder = require('./helpers/seeder');
const routes = require('./routes/routes');
const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require('./routes/adminRoutes');

const { ENV, PORT }  = require('./configs/constants');
const env = process.env.NODE_ENV || ENV.DEV;
const sassOpts = {
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/css'),
  outputStyle: 'compressed',
  prefix: '/css'
};

if (env === ENV.DEV) {
  dotenv.load({ path: '.env' });
  // sassOpts.outputStyle = 'extended';
}

if (env == ENV.TEST) {
  dotenv.load({ path: '.env.test' });
}

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, (error) => {
  if (error) {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  }

  // Feed some data in DB
  seeder.createUsers();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass(sassOpts));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/signin' &&
    req.path !== '/signup' && !req.path.match(/^\/auth/) && !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path === '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

/**
 * Serve static files
 */
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * App routes
 */
app.use('/', routes);
app.use('/api/', apiRoutes);
app.use('/admin/', adminRoutes);

/**
 * 404
 */
app.use((req, res, next) => {
  res.status(404).render('notFound');
});

/**
 * Error Handler.
 */
app.use(errorHandler());


/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
