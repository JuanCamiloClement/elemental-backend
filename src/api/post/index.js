const router = require('express').Router();
const { isAuthenticated } = require('../../middlewares/authentication.js');
const { formData } = require('../../middlewares/formData.js')
const {
  getPostByIdHandler,
  createPostHandler,
} = require('./post.controller.js');

router.route('/:id').get(getPostByIdHandler);
router.route('/').post(isAuthenticated, formData, createPostHandler);

module.exports = router;