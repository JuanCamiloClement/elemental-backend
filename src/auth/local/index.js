const router = require('express').Router();
const {
  loginHandler,
  activateAccountHandler,
} = require('./local.controller.js');

router.route('/login').post(loginHandler);
router.route('/activate-account/:token').get(activateAccountHandler);

module.exports = router;