const {
  getAllUsers,
  getUserById,
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
    res.status(400).json({ message: 'Users could not be found', error: message });
  }
}

const createUserHandler = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      password,
    }

    const user = await createUser(newUser);

    res.status(201).json({ message: 'User created', user });
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
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
}