const { mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  role: { type: String, required: true, emun: ["admin", "user"] },
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
