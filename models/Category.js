const { mongoose, Schema } = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: Boolean, default: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Category", CategorySchema);
