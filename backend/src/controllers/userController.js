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


const getUser = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user ID is stored in req.user after authentication

        // Fetch the user from the database
        const user = await User.findById(userId).select('password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not  found'});
        }
        return res.status(200).json({success: true, user});

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({success: false, message: 'Server error in getting user profile'});
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user 10 is stored in  req.user after authentication
        const {name, email, address, passsword} = req.body;

        const updatedata = {name, email, address};

        if(passsword && passsword.trim() !== '') {
            const hashedPassword = await bcrypt.hash(passsword, 10);
            updatedata.passsword = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(userId, updatedata, {new: true}).select('password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        return res.status(200).json({success: true, message: 'Profile updated successfully', user});
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({success: false, message: 'Server error in updating profile'});
    }
}


export {addUser, getUsers, deleteUser, getUser, updateUserProfile};






