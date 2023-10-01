const { getUserById } = require('../user/user.service.js');
const { getPostById } = require('../post/post.service.js');
const { verifyToken } = require('../../utils/jwt.js');
const {
  createComment
} = require('./comment.service.js');

const createCommentHandler = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const token = req.headers?.authorization?.split(" ")[1];

    const { id } = verifyToken(token);

    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({ message: 'User could not be found' });
    }

    const post = await getPostById(postId);
    if (!post) {
      return res.status(401).json({ message: 'Post could not be found' });
    }

    const data = {
      content,
      user: user._id,
      post: post._id
    }

    const comment = await createComment(data);
    user.comments.unshift(comment);
    await user.save({ validateBeforeSave: false });
    // await user.updateOne();
    post.comments.unshift(comment);
    await post.save({ validateBeforeSave: false });
    // await post.updateOne();

    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch ({ message }) {
    res.status(401).json({ message: 'Comment could not be posted', error: message });
  }
}

module.exports = {
  createCommentHandler,
}