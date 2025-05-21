// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) return res.redirect("/login");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.redirect("/login");
    }
}

module.exports = authenticate;
