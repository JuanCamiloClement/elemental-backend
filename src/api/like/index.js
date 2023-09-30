const router = require('express').Router();
const { isAuthenticated } = require('../../middlewares/authentication.js');
const {
  createLikeHandler,
  deleteLikeHandler,
} = require('./like.controller.js');

router.route('/').post(isAuthenticated, createLikeHandler);
router.route('/').delete(isAuthenticated, deleteLikeHandler);

module.exports = router;