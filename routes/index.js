// Archivo de barril

const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");
const searchRoutes = require("./search.routes");
const uploadsRoutes = require("./uploads.routes");

module.exports = {
  userRoutes,
  authRoutes,
  categoryRoutes,
  productRoutes,
  searchRoutes,
  uploadsRoutes,
};
