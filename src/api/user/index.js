const router = require('express').Router();
const {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} = require('./user.controller.js');

const { isAuthenticated } = require('../../middlewares/authentication.js');

router.route('/').get(isAuthenticated, getAllUsersHandler);
router.route('/:id').get(getUserByIdHandler);
router.route('/').post(createUserHandler);
router.route('/:id').put(updateUserHandler);
router.route('/:id').delete(deleteUserHandler);

module.exports = router;