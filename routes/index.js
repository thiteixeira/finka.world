const express = require('express');
const router = express.Router();
const {
  getLogin,
  getLogout,
  postLogin,
  getRegister,
  postRegister,
} = require('../controllers');
const { errorHandler } = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET sitemap. */
router.get('/sitemap.xml', (req, res, next) => {
  res.sendFile('../public/sitemap.xml');
});

/* GET login page */
router.get('/login', getLogin);

/* POST login page */
router.post('/login', errorHandler(postLogin));

/* GET logout page */
router.get('/logout', getLogout);

/* GET /forgot-password */
router.get('/forgot-pwd', (req, res, next) => {
  res.render('forgot-pwd', { title: '' });
});

/* PUT /forgot-password */
router.put('/forgot-pwd', (req, res, next) => {
  res.render('forgot-pwd'), { title: '' };
});

/* GET /reset-password/:token */
router.get('/reset-pwd:token', (req, res, next) => {
  res.render('reset-pwd:token', { title: '' });
});

/* PUT /reset-password/:token */
router.put('/reset-pwd:token', (req, res, next) => {
  res.render('reset-pwd:token', { title: '' });
});

/* GET register page */
router.get('/register', getRegister);

/* POST register page */
router.post('/register', errorHandler(postRegister));

/* GET About page. */
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About' });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact Us' });
});

/* GET recipients page. */
router.get('/recipients', (req, res, next) => {
  res.render('recipients', { title: '' });
});

/* GET upcoming page. */
router.get('/upcoming', (req, res, next) => {
  res.render('upcoming', { title: '' });
});

/* GET Privacy page. */
router.get('/privacy', (req, res, next) => {
  res.render('privacy', { title: 'Privacy Policy' });
});

/* GET ToS page. */
router.get('/terms', (req, res, next) => {
  res.render('terms', { title: 'Terms of Service' });
});

/* GET Refund Policy page. */
router.get('/refund', (req, res, next) => {
  res.render('refund', { title: 'Refund Policy' });
});

/* GET Cookie Policy page. */
router.get('/cookie-policy', (req, res, next) => {
  res.render('cookie-policy', { title: 'Cookie Policy' });
});

module.exports = router;
