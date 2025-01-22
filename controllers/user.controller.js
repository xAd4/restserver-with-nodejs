const userService = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

const getUsers = async (req, res) => {
  try {
    const { user, totalUser } = await userService.getUsers(req);
    res.status(200).json({ totalUser, user });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const { userAuthenticated } = req;

    res.status(200).json({ "User deleted": deletedUser, userAuthenticated });
  } catch (error) {
    res.status(500).json({ message: `Error ${error.message}` });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
