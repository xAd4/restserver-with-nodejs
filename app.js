const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const {
  userRoutes,
  authRoutes,
  categoryRoutes,
  productRoutes,
  searchRoutes,
} = require("./routes");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// Rutas
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/:collection/:term", searchRoutes);

// Puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server ${PORT} running`);
});

// Conexión a la base de datos
connectDB();
