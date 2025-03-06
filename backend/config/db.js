// Load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');

async function connect() {
  // Use the environment variables in your connection string
  const mongoUri = process.env.MONGO_URI.replace('${USER}', process.env.USER).replace('${PASS}', process.env.PASS);

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

module.exports = connect;
