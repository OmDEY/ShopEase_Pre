const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Middleware to check token
async function authMiddleware(req, res, next) {
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

    console.log(decoded);
    
    // Fetch the user from the database using the user ID in the token
    const user = await User.findById(decoded.userId ? decoded.userId : decoded.adminId).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Attach the user object to the req object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
