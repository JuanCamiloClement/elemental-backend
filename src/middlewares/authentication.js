const { getUserById } = require('../api/user/user.service.js');
const { verifyToken } = require('../utils/jwt.js');

const isAuthenticated = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await getUserById(decoded.id);

  req.user = user;

  next();
}

module.exports = {
  isAuthenticated,
}