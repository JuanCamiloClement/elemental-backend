const { getUserByEmail } = require('../../api/user/user.service.js');
const { comparePassword } = require('../../utils/bcrypt.js');
const { signToken } = require('../../utils/jwt.js');

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    // if (user.isActive === false) {
    //   return res.status(401).json({ message: 'User is inactivated' });
    // }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      id: user._id,
      email: user.email,
    }

    const token = signToken(payload);

    const profile = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
    }

    res.status(201).json({ message: 'Login successful', token, profile });
  } catch ({ message }) {
    res.status(401).json({ message: 'There has been an error accessing information, try again later', error: message });
  }
}

module.exports = {
  loginHandler,
}