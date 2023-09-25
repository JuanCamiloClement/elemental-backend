const router = require('express').Router();
const {
  getAllUsersHandler,
  getUserByIdHandler,
  getUserByUsernameHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} = require('./user.controller.js');

router.route('/').get(getAllUsersHandler);
router.route('/:id').get(getUserByIdHandler);
router.route('/logged/:userName').get(getUserByUsernameHandler);
router.route('/').post(createUserHandler);
router.route('/:id').put(updateUserHandler);
router.route('/:id').delete(deleteUserHandler);

module.exports = router;