const router = require('express').Router();
const { isAuthenticated } = require('../../middlewares/authentication.js');
const { formData } = require('../../middlewares/formData.js');
const {
  getAllUsersHandler,
  getUserByIdHandler,
  getUserByUsernameHandler,
  createUserHandler,
  updateUserHandler,
  updateAvatarHandler,
  removeAvatarHandler,
  deleteUserHandler
} = require('./user.controller.js');

router.route('/').get(getAllUsersHandler);
router.route('/:id').get(getUserByIdHandler);
router.route('/single/:userName').get(getUserByUsernameHandler);
router.route('/').post(createUserHandler);
router.route('/info').put(isAuthenticated, updateUserHandler);
router.route('/avatar').put(isAuthenticated, formData, updateAvatarHandler);
router.route('/remove-avatar').put(isAuthenticated, removeAvatarHandler);
router.route('/:id').delete(deleteUserHandler);

module.exports = router;