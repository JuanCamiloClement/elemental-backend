const {
  getAllUsers,
  getUserById,
  createUser
} = require("./user.service");

const getAllUsersHandler = async (_, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({ message: 'Users found', users });
  } catch (error) {
    res.status(400).json({ message: 'Users could not be found', error: error.message });
  }
}

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.status(200).json({ message: 'User found', user });
  } catch (error) {
    res.status(400).json({ message: 'Users could not be found', error: error.message });
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
  } catch (error) {
    res.status(400).json({ message: 'User could not be created', error: error.message })
  }
}

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
}