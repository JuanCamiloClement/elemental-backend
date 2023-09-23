const router = require('express').Router();
const {
  getPostByIdHandler,
  createPostHandler,
} = require('./post.controller.js');

router.route('/:id').get(getPostByIdHandler);
router.route('/:id').post(createPostHandler);

module.exports = router;