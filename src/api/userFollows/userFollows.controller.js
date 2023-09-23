const {
  getUserById,
  getUserByUsername,
} = require('../user/user.service.js');
const {
  createUserFollows
} = require('./userFollows.service.js');

const createUserFollowsHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { usernameToFollow } = req.body;

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

module.exports = {
  createUserFollowsHandler,
}