const { hashPassword, createValidationToken } = require('../../utils/bcrypt.js');
const { sendMailWithSendgrid } = require('../../config/sendgrid.js');
const { welcomeEmail } = require('../../utils/emails.js');
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
} = require("./user.service");

const getAllUsersHandler = async (_, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({ message: 'Users found', users });
  } catch ({ message }) {
    res.status(400).json({ message: 'Users could not be found', error: message });
  }
}

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.status(200).json({ message: 'User found', user });
  } catch ({ message }) {
    res.status(400).json({ message: 'User could not be found', error: message });
  }
}

const getUserByUsernameHandler = async (req, res) => {
  try {
    const { userName } = req.params;

    const user = await getUserByUsername(userName);

    res.status(200).json({ message: 'User found', user });
  } catch ({ message }) {
    res.status(400).json({ message: 'User could not be found', error: message });
  }
}

const createUserHandler = async (req, res) => {
  try {
    const body = req.body;

    const hashedPassword = await hashPassword(body.password);

    const newUser = {
      ...body,
      password: hashedPassword,
      validateToken: createValidationToken(body.email),
      tokenExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }

    const user = await createUser(newUser);

    sendMailWithSendgrid(welcomeEmail(user));

    res.status(201).json({ message: 'User created, must verify email' });
  } catch ({ message }) {
    res.status(400).json({ message: 'User could not be created', error: message });
  }
}

const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, userName, email, password } = req.body;

    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      password,
    }

    const updatedUser = await updateUser(id, newUser);

    res.status(201).json({ message: 'User updated', user: updatedUser });
  } catch ({ message }) {
    res.status(401).json({ message: 'User could not be updated', error: message });
  }
}

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    res.status(201).json({ message: 'User deleted', user: deletedUser });
  } catch ({ message }) {
    res.status(401).json({ message: 'User could not be deleted', error: message });
  }
}

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  getUserByUsernameHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
}