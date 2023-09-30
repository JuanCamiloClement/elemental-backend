const User = require('./user.model');

const getAllUsers = async () => {
  try {
    const users = await User.find()
      .select('firstName lastName userName email bio')
      .populate({
        path: 'posts likes comments follows followers',
      });
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ userName: username })
      .select('-password')
      .populate({
        path: 'posts',
        select: '-updatedAt',
        populate: {
          path: 'user',
          select: '-_id'
        }
      })
      .populate({
        path: 'likes',
        select: 'post -_id'
      })
      .populate('comments')
      .populate('followers')
      .populate({
        path: 'follows',
        select: '-_id',
        populate: {
          path: 'user',
          select: 'firstName lastName userName -_id',
          populate: 'posts'
        }
      })

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email })
      .populate({
        path: 'follows',
        select: '-_id -follower -createdAt -updatedAt',
        populate: {
          path: 'user',
          select: 'firstName lastName userName -_id'
        }
      })
      .populate({
        path: 'followers',
        select: '-_id -user -createdAt -updatedAt',
        populate: {
          path: 'follower',
          select: 'firstName lastName userName -_id'
        }
      })
      .populate({
        path: 'likes',
        select: 'post -_id'
      });

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

const getUserByValidateToken = async (token) => {
  try {
    const user = await User.findOne({ validateToken: token });

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

const createUser = async (data) => {
  try {
    const user = await User.create(data);

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

const updateUser = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
}

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUserByValidateToken,
  createUser,
  updateUser,
  deleteUser
}