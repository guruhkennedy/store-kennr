// routes/adminRoutes.js
const express = require("express");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const authenticate = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/uploadMiddleware");
require("dotenv").config();

const router = express.Router();

// Render Login Page
router.get("/login", (req, res) => {
    res.render("login", { title: "Admin Login" });
});

// Handle Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        
        if (!admin || !(await admin.comparePassword(password))) {
            return res.render("login", { error: "Invalid username or password" });
        }

        // Generate Token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.redirect("/admin/dashboard");
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

router.get("/admin/dashboard", authenticate, async (req, res) => {
    try {
        const products = await Product.find().sort({ name: 1 });
        res.render("dashboard", { title: "Admin Dashboard", products });
    } catch (error) {
        res.status(500).send("Error loading dashboard");
    }
});

// Add New Product
router.post("/admin/products", authenticate, upload.single("image"), async (req, res) => {
    try {
        const { name, brand, description, price, stock } = req.body;
        const image_url = `/images/${req.file.filename}`;
        const product = new Product({ name, brand, description, price, stock, image_url });
        await product.save();
        res.redirect("/admin/dashboard");
    } catch (error) {
        res.status(500).send("Failed to add product");
    }
});

// Edit Product
router.post("/admin/products/edit/:id", authenticate, upload.single("image"), async (req, res) => {
    try {
        const { name, brand, description, price, stock } = req.body;
        const updateData = { name, brand, description, price, stock };

        // Update image if new file uploaded
        if (req.file) {
            updateData.image_url = `/images/${req.file.filename}`;
        }

        await Product.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/admin/dashboard");
    } catch (error) {
        res.status(500).send("Failed to edit product");
    }
});

// Delete Product
router.get("/admin/products/delete/:id", authenticate, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect("/admin/dashboard");
    } catch (error) {
        res.status(500).send("Failed to delete product");
    }
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.redirect("/login");
});

module.exports = router;
