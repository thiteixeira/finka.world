const express = require('express');
const router = express.Router();
const { getMyContent } = require('../controllers');
const { isLoggedIn } = require('../middleware');

/* GET my-content */
router.get('/', isLoggedIn, getMyContent);

module.exports = router;
