const User = require('../models/user');

module.exports = {
  errorHandler: (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  },
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    // If user is not logged in, redirect to /login
    req.session.error = 'User not logged in!';
    req.session.redirectTo = req.originalUrl;
    res.redirect('/login');
  },
  isValidPassword: async (req, res, next) => {
    const { user } = await User.authenticate()(
      req.user.username,
      req.body.currentPassword
    );
    if (user) {
      // add user to res.locals
      res.locals.user = user;
      next();
    } else {
      req.session.error = 'Incorrect current password!';
      return res.redirect('/login');
    }
  },
};
