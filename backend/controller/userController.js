const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addWelcomeEmail } = require('../Queue/emailQueue');
require('dotenv').config();

const verifyToken = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token is expired
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ msg: 'Token has expired' });
        }

        // Fetch the user from the database using the user ID in the token
        const user = await User.findById(decoded.userId).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }

        // Return the user data
        res.json({
            msg: 'Token is valid',
            user
        });
    } catch (error) {
        res.status(401).json({ msg: 'Session Expired Please Login Again' });
    }
};

const fetchAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const users = await User.find({role: 'user'}).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const firstName = name.split(' ')[0];
        const lastName = name.split(' ')[1];

        // Create new user
        user = new User({
            firstName,
            lastName,
            email,
            password,
        });

        // Save user to database
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        addWelcomeEmail(email, firstName);

        res.status(201).json({
            msg: 'User registered successfully',
            userId: user._id,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ userId: user._id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const captureUserData = async (req, res) => {
    try {
        const { userId, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.phoneNumber = phoneNumber;
        user.shippingAddress.addressLine1 = addressLine1;
        user.shippingAddress.addressLine2 = addressLine2;
        user.shippingAddress.city = city;
        user.shippingAddress.state = state;
        user.shippingAddress.postalCode = postalCode;
        user.shippingAddress.country = country;

        user.billingAddress = user.shippingAddress;

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    fetchAllUsers,
    registerUser,
    loginUser,
    captureUserData,
    getUserById,
    verifyToken
}