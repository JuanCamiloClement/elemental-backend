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
    const user = await User.findOne({ userName: username });

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
  createUser,
  updateUser,
  deleteUser
}