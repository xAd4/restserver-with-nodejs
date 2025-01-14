const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", require("./routes"));
app.use("/api/users", userRoutes);

// Port
const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Server ${PORT} running`);
});

// Connect Database
connectDB();
