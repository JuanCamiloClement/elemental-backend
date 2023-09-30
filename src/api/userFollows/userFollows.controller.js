const { verifyToken } = require('../../utils/jwt.js');
const {
  getUserById,
  getUserByUsername,
} = require('../user/user.service.js');
const {
  createUserFollows,
  deleteUserFollows,
} = require('./userFollows.service.js');

const createUserFollowsHandler = async (req, res) => {
  try {
    const { usernameToFollow } = req.body;

    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id: userId } = decoded;

    const loggedUser = await getUserById(userId);
    if (!loggedUser) {
      return res.status(400).json({ message: 'Logged user could not be found' });
    }

    const userToFollow = await getUserByUsername(usernameToFollow);
    if (!userToFollow) {
      return res.status(400).json({ message: 'User to follow could not be found' });
    }

    const data = {
      user: userToFollow._id,
      follower: userId,
    }

    const userFollows = await createUserFollows(data);
    loggedUser.follows.unshift(userFollows);
    await loggedUser.save({ validateBeforeSave: false });
    userToFollow.followers.unshift(userFollows);
    await userToFollow.save({ validateBeforeSave: false });

    res.status(201).json({ message: 'User followed successfully', userFollows });
  } catch ({ message }) {
    res.status(401).json({ message: 'User could not be followed', error: message });
  }
}

const deleteUserFollowsHandler = async (req, res) => {
  try {
    const { follower, followedUser } = req.query;

    const { _id: followerId } = await getUserByUsername(follower);
    if (!followerId) {
      return res.status(400).json({ message: 'Current follower could not be found' });
    }

    const { _id: followedUserId } = await getUserByUsername(followedUser);
    if (!followedUserId) {
      return res.status(400).json({ message: 'Currently followed user could not be found' });
    }

    const data = {
      user: followedUserId,
      follower: followerId,
    }

    const deletedUserFollows = await deleteUserFollows(data);
    if (!deletedUserFollows) {
      res.status(401).json({ message: 'Could not unfollow user because follow does not exist' });
    }

    res.status(201).json({ message: 'User unfollowed successfully' });
  } catch ({ message }) {
    res.status(401).json({ message: 'User could not be unfollowed', error: message });
  }
}

module.exports = {
  createUserFollowsHandler,
  deleteUserFollowsHandler,
}