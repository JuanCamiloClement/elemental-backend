const Like = require('./like.model.js');

const createLike = async (data) => {
  try {
    const like = await Like.create(data);

    return like;
  } catch (error) {
    throw new Error(error);
  }
}

const deleteLike = async (data) => {
  try {
    const deletedLike = await Like.findOneAndDelete(data);

    return deletedLike;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createLike,
  deleteLike,
}