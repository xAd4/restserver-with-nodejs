const User = require("../models/User");

const createUser = async function (req, res) {
  try {
    // Creación de nueva instancia
    const { name, email, password, img, role } = req.body;
    const user = new User({ name, email, password, img, role });

    // Guardar la instancia creada
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error} ` });
  }
};

module.exports = createUser;
