const User = require("../models/User");

// POST
const createUser = async (req, res) => {
  try {
    const { name, email, password, img, role } = req.body;
    const user = new User({ name, email, password, img, role });

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email exists already" });
    }

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error} ` });
  }
};

module.exports = {
  createUser,
};
