const { response } = require("express");

// Middleware para verificar si un usuario de la base de datos es administrador
const isAdmin = (req, res = response, next) => {
  if (!req.userAuthenticated)
    return res.status(500).json({
      msg: "Role verification attempted without validating the token first",
    });

  const { role, name } = req.userAuthenticated;

  if (role !== "admin") {
    return res.status(401).json({
      msg: `${name} is not an admin - Unauthorized`,
    });
  }
  next();
};

// Middleware que verifica si un usuario en la base de datos tiene algún rol
const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.userAuthenticated)
      return res.status(500).json({
        msg: "Role verification attempted without validating the token first",
      });

    if (!roles.includes(req.userAuthenticated.role)) {
      return res.status(401).json({
        msg: `The service requires one of these roles: ${roles}`,
      });
    }
    console.log(roles, req.userAuthenticated.role);
    next();
  };
};

module.exports = { isAdmin, hasRole };
