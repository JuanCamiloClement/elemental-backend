const router = require('express').Router();
const { isAuthenticated } = require('../../middlewares/authentication.js');
const {
  createUserFollowsHandler,
  deleteUserFollowsHandler,
} = require('./userFollows.controller.js');

router.route('/').post(isAuthenticated, createUserFollowsHandler);
router.route('/').delete(deleteUserFollowsHandler);

module.exports = router;