const Comment = require('./comment.model.js');

const createComment = async (data) => {
  try {
    const comment = await Comment.create(data);

    return comment;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createComment,
}