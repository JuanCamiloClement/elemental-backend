const router = require('express').Router();
const { loginHandler } = require('./local.controller.js');

router.route('/login').post(loginHandler);

module.exports = router;