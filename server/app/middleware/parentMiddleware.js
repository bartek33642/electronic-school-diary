const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
const config = require('../config');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = { email, role: 'parent' }; 
    const token = jwt.sign(user, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token });
});

  
module.exports = router;
