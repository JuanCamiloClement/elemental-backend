const { getUserById } = require('../user/user.service.js');
const { getPostById } = require('../post/post.service.js');
const {
  createComment
} = require('./comment.service.js');

const createCommentHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId, content } = req.body;

    const user = await getUserById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User could not be found' });
    }

    const post = await getPostById(postId);
    if (!post) {
      return res.status(401).json({ message: 'Post could not be found' });
    }

    const data = {
      content,
      user: userId,
      post: postId
    }

    const comment = await createComment(data);
    user.comments.unshift(comment);
    await user.save({ validateBeforeSave: false });
    post.comments.unshift(comment);
    await post.save({ validateBeforeSave: false });

    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch ({ message }) {
    res.status(401).json({ message: 'Comment could not be posted', error: message });
  }
}

module.exports = {
  createCommentHandler,
}