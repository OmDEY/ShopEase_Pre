const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
    try {
        const { fullName, email, username, password, confirmPassword, phoneNumber, role, securityQuestion, securityAnswer, companyName, address, agreeToTerms } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (!agreeToTerms) {
            return res.status(400).json({ message: 'You must agree to the terms and conditions' });
        }

        const existingAdmin = await User.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email or username already exists' });
        }

        const newAdmin = new User({
            fullName,
            email,
            username,
            password,
            phoneNumber,
            role: role || 'admin',
            securityQuestion,
            securityAnswer,
            companyName,
            address,
            agreeToTerms
        });

        await newAdmin.save();

        // Generate JWT Token
        const token = jwt.sign(
            { id: newAdmin._id, role: newAdmin.role },
            process.env.JWT_SECRET, 
            { expiresIn: '7d' } // Token valid for 7 days
        );

        res.status(201).json({
            message: 'Admin registered successfully',
            token,
            admin: {
                id: newAdmin._id,
                fullName: newAdmin.fullName,
                email: newAdmin.email,
                username: newAdmin.username,
                role: newAdmin.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};


const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if admin exists
        const admin = await User.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, adminId: admin._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyAdminToken = async (req, res) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

        // Extract token from "Bearer <token>"
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await User.findById(decoded.adminId);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        return res.status(200).json({ message: 'Verified', admin });
    } catch (error) {
        console.error(error);

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    registerAdmin,
    loginAdmin,
    verifyAdminToken
};
