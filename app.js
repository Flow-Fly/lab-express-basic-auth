// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const session = require('express-session')

const User = require('./models/User.model')

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))

  app.use((req, res, next) => {
    if (req.session.currentUser) {
      User.findById(req.session.currentUser._id)
        .then(user => {
          res.locals.currentUser = user
          res.locals.isLoggedIn = true
          next()
        })
        .catch(e => next(e))
    } else {
      res.locals.currenUser = undefined
      res.locals.isLoggedIn = false
      next()
    }
  })



// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);
app.use('/auth', require('./routes/auth'))
app.use('/private', require('./routes/private.route'))
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

