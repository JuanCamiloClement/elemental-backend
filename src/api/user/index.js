const router = require('express').Router();
const {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler
} = require('./user.controller.js');

router.route('/').get(getAllUsersHandler);
router.route('/:id').get(getUserByIdHandler);
router.route('/').post(createUserHandler);

module.exports = router;