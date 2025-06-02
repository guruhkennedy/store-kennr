// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    image_url: { type: String, required: true },
    stock: { type: Number, default: 0, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema);