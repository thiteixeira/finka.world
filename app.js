const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const engine = require('ejs-mate');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');

// Passport User model
const User = require('./models/user');

// Routes
const indexRouter = require('./routes/index');
const contentRoutes = require('./routes/content');
const mycontentRouter = require('./routes/my-content');

const app = express();

// Connect to the database
const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/finka';
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connect to DB');
  })
  .catch((err) => {
    console.error('ERROR', err.message);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database!');
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Passport and Sessions
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'finka web app',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set Local Variables for the Middleware
app.use((req, res, next) => {
  // set default page title
  res.locals.title = '';

  // set current user
  res.locals.currentUser = req.user;

  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;

  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;

  // continue on to next function in middleware chain
  next();
});

// Mount Routes
app.use('/', indexRouter);
app.use('/content', contentRoutes);
app.use('/my-content', mycontentRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
