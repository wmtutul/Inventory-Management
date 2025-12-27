import User from "../models/User.js";
import bcrypt from 'bcrypt'


const addUser = async (req, res) => {
    try {
        const {name, email, password, address, role} = req.body;

        //Check if the User already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a new User
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            address,
            role
        });

        await newUser.save();
        return res.status(201).json({success: true, message: 'User added successfully'});

    } catch (error) {
        console.error('Error adding User:', error);
        return res.status(500).json({success: false, message: 'Server error'});
    }
}


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({success: true, users});
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({success: false, message: 'Server error in getting User'});
    }
}


const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        //Check if the category exists
        const existingUser = await User.findById(id);
        if(!existingUser) {
            return res.status(404).json({success: false, message: 'User not found' });
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: 'User deleted successfully'});

    } catch (error) {
        console.error('Error deleting User:', error);
        return res.status(500).json({success: false, message: 'Server error'});
    }
}

export {addUser, getUsers, deleteUser};





