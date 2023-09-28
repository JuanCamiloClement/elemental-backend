const { getUserById } = require('../user/user.service.js');
const { verifyToken } = require('../../utils/jwt.js');

const {
  getPostById,
  createPost
} = require('./post.service.js');

const getPostByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await getPostById(id);

    res.status(200).json({ message: 'Post found', post });
  } catch ({ message }) {
    res.status(401).json({ message: 'Post could not be found', error: message });
  }
}

const createPostHandler = async (req, res) => {
  try {
    const { url } = req.body;
    const token = req.headers?.authorization?.split(" ")[1];

    const { id } = verifyToken(token)

    const user = await getUserById(id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const data = {
      url,
      user: id
    }

    const post = await createPost(data);
    user.posts.unshift(post);
    await user.save({ validateBeforeSave: false });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch ({ message }) {
    res.status(401).json({ message: 'Post could not be created', error: message });
  }
}

module.exports = {
  getPostByIdHandler,
  createPostHandler,
}