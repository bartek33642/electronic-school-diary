const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userDAO = require('../DAO/userDAO');
const config = require('../config');

const router = express.Router();

// Route to handle user registration
router.post('/register', async (req, res) => {
  const { email, password, role, active, status, first_name, second_name } = req.body;

  try {
    // Check if the user with the given email already exists in the database
    const existingUser = await userDAO.getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and get the user_id
    const userId = await userDAO.registerUser(email, hashedPassword, role, active, status, first_name, second_name);

    // Create a JWT token for the newly registered user
    const token = jwt.sign({ user_id: userId, email, role }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while registering user.' });
  }
});

module.exports = router;
