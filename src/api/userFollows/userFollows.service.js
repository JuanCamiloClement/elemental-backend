const UserFollows = require('./userFollows.model.js');

const createUserFollows = async (data) => {
  try {
    const userFollows = UserFollows.create(data);

    return userFollows;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createUserFollows,
}