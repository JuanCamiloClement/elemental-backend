const router = require('express').Router();
const {
  createLikeHandler,
} = require('./like.controller.js');

router.route('/:userId').post(createLikeHandler);

module.exports = router;