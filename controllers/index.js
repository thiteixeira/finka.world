const User = require('../models/user');
const passport = require('passport');

module.exports = {
  // GET /register
  getRegister(req, res, next) {
    res.render('register', { title: 'New User Registration' });
  },

  // POST /register
  async postRegister(req, res, next) {
    try {
      const user = await User.register(new User(req.body), req.body.password);
      req.login(user, (err) => {
        if (err) return next(err);
        req.session.success = `Welcome, ${user.username}`;
        res.redirect('/');
      });
    } catch (err) {
      const { username, email } = req.body;
      let error = err.message;
      if (
        error.includes('duplicate') &&
        error.includes('index: email_1 dup key')
      ) {
        error = 'A user with the given email is already registered';
      }
      res.render('register', { title: 'Register', username, email, error });
    }
  },

  // GET /login
  getLogin(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/');
    if (req.query.returnTo) req.session.redirectTo = req.headers.referer;
    res.render('login', { title: 'Log In' });
  },

  // POST /login
  async postLogin(req, res, next) {
    const { username, password } = req.body;
    // User.authenticate returns a function that we are immediately invoking
    const { user, error } = await User.authenticate()(username, password);
    // If error, break (next)
    if (!user && error) return next(error);
    // Else, Greet user
    req.login(user, function (err) {
      if (err) return next(err);
      req.session.success = `Welcome back, ${username}!`;
      const redirectUrl = req.session.redirectTo || '/my-content';
      delete req.session.redirectTo;
      res.redirect(redirectUrl);
    });
  },

  // GET /logout
  getLogout(req, res, next) {
    req.session.success = `User logged out`;
    req.logout();
    res.redirect('/');
  },

  // GET /my-content
  getMyContent(req, res, next) {
    let user = req.user.username;
    res.render('my-content', { title: `Showing Content for User ${user}` });
  },
};
