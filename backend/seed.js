
import bcrypt from 'bcrypt';
import User from "./src/models/User.js";
import connectDB from "./db_connection/connection.js";



const register = async () => {
    try {
        connectDB();
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "admin",
            email: "admin@gmail.com",
            password: hashPassword,
            address: "admin address",
            role: "admin"
        })
        await newUser.save();
        console.log("Admin user created successfully");

    } catch (error) {
        console.log(error);
    }
}

register();



  