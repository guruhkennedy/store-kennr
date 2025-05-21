// routes/pagesRoutes.js
const express = require("express");
const router = express.Router();

// Syarat dan Ketentuan
router.get("/terms", (req, res) => {
    res.render("terms", { title: "Syarat dan Ketentuan" });
});

// Kontak
router.get("/contact", (req, res) => {
    res.render("contact", { title: "Kontak" });
});

// Home (Index)
router.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

module.exports = router;
