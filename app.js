require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", require("./routes"));

// Port
const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Server ${PORT} running`);
});

// Connect Database
connectDB();
