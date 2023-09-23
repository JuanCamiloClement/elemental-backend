const Post = require('./post.model.js');

const getPostById = async (id) => {
  try {
    const post = await Post.findById(id);

    return post;
  } catch (error) {
    throw new Error(error);
  }
}

const createPost = async (data) => {
  try {
    const post = await Post.create(data);

    return post;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getPostById,
  createPost,
}