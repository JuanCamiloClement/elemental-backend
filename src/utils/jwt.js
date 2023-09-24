const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const signToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

  return token;
}

const verifyToken = (token) => {
  const decoded = jwt.verify(token, SECRET);

  return decoded;
}

module.exports = {
  signToken,
  verifyToken,
}