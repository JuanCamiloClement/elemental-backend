const { getUserById } = require('../user/user.service.js');
const { getPostById } = require('../post/post.service.js');
const {
  createLike
} = require('./like.service.js');

const createLikeHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.body;

    const user = await getUserById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User could not be found' });
    }

    const post = await getPostById(postId);
    if (!post) {
      return res.status(401).json({ message: 'User could not be found' });
    }

    const data = {
      user: userId,
      post: postId,
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

module.exports = {
  createLikeHandler,
}