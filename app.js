// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve Static Files
app.use("/assets", express.static("./assets"));
app.use("/images", express.static("./images"));

// Routes
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const pagesRoutes = require("./routes/pagesRoutes");
app.use("/", productRoutes);
app.use("/", adminRoutes);
app.use("/", pagesRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));