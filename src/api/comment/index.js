const router = require('express').Router();
const { isAuthenticated } = require('../../middlewares/authentication.js');
const {
  createCommentHandler,
} = require('./comment.controller.js');

router.route('/:postId').post(isAuthenticated, createCommentHandler);

module.exports = router;