// routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get All Products with Filters
router.get("/", async (req, res) => {
    try {
        const { brand, sort, limit } = req.query;
        const filter = {};
        
        // Filter by brand
        if (brand) filter.brand = brand;
        
        // Sort by name (alphabetical order)
        const sortOption = sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : { name: 1 };
        
        // Pagination (default to show all)
        const perPage = limit ? parseInt(limit) : 0;
        
        // Fetch products and brands
        const products = await Product.find(filter).sort(sortOption).limit(perPage > 0 ? perPage : 0);
        const brands = await Product.distinct("brand");

        // Render index.ejs with selected options
        res.render("index", {
            title: "Home",
            products,
            brands,
            selectedBrand: brand || "",
            selectedSort: sort || "",
            selectedLimit: limit || "all"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;