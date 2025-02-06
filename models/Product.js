const { mongoose, Schema } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: Boolean, default: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  isAvailable: { type: Boolean, required: true, default: true },
  img: { type: String },
  price: { type: Number, required: true, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
