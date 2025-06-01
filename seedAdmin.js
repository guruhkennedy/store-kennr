require("dotenv").config();
const mongoose = require("./models/db");
const Admin = require("./models/Admin");

async function createAdmin() {
    try {
        const username = "admin";
        const password = "kontol123";

        
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            console.log("User already exists");
            mongoose.connection.close();
            return;
        }
        const admin = new Admin({ username, password });
        await admin.save();
        console.log("User created successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error creating User:", error);
        mongoose.connection.close();
    }
}

createAdmin();
