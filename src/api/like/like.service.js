const Like = require('./like.model.js');

const createLike = async (data) => {
  try {
    const like = await Like.create(data);

    return like;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createLike,
}