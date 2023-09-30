const { getUserById } = require('../user/user.service.js');
const { getPostById } = require('../post/post.service.js');
const { verifyToken } = require('../../utils/jwt.js');
const {
  createLike,
  deleteLike,
} = require('./like.service.js');

const createLikeHandler = async (req, res) => {
  try {
    const { postId } = req.body;

    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = decoded;

    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({ message: 'User could not be found' });
    }

    const post = await getPostById(postId);
    if (!post) {
      return res.status(401).json({ message: 'Post could not be found' });
    }

    const data = {
      user: user._id,
      post: post._id,
    }

    const like = await createLike(data);
    user.likes.unshift(like);
    await user.save({ validateBeforeSave: false });
    post.likes.unshift(like);
    await post.save({ validateBeforeSave: false });

    res.status(201).json({ message: 'Like created successfully', like });
  } catch ({ message }) {
    res.status(401).json({ message: 'Like could not be added', error: message });
  }
}

const deleteLikeHandler = async (req, res) => {
  try {
    const { postId } = req.query;

    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = decoded;

    const post = await getPostById(postId);
    if (!post) {
      return res.status(401).json({ message: 'Post could not be found' });
    }
    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({ message: 'User could not be found' });
    }

    const data = {
      user: user._id,
      post: post._id,
    }

    const deletedLike = await deleteLike(data);
    if (!deletedLike) {
      return res.status(401).json({ message: 'Like could not be found' });
    }

    user.likes.remove(deletedLike);
    await user.save({ validateBeforeSave: false });
    post.likes.remove(deletedLike);
    await post.save({ validateBeforeSave: false });

    res.status(201).json({ message: 'Like deleted' });
  } catch ({ message }) {
    res.status(401).json({ message: 'Like could not be deleted', error: message });
  }
}

module.exports = {
  createLikeHandler,
  deleteLikeHandler
}