const mongoose = require("mongoose");

const connectDB = async function () {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connect ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
