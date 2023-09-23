const router = require('express').Router();
const {
  createCommentHandler,
} = require('./comment.controller.js');

router.route('/:userId').post(createCommentHandler);

module.exports = router;