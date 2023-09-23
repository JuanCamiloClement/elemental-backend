const router = require('express').Router();
const {
  createUserFollowsHandler,
} = require('./userFollows.controller.js');

router.route('/:userId').post(createUserFollowsHandler);

module.exports = router;