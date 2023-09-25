const bcrypt = require('bcrypt');
const crypto = require('crypto');

const hashPassword = async (password) => {
  const factor = 12;
  const salt = await bcrypt.genSalt(factor);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

const createValidationToken = (data) => {
  const validationToken = crypto.createHash('sha256').update(data).digest('hex');
  return validationToken;
}

module.exports = {
  hashPassword,
  comparePassword,
  createValidationToken,
}