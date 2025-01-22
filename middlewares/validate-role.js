const { response } = require("express");

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

module.exports = isAdmin;
