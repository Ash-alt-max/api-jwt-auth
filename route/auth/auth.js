const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Replace with your secret key
const User = require('../../models/User');

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        // Create a new user 
        const newUser = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign(
            {userId: newUser.id, email:newUser.email, PASSWORD: hashedPassword },
            SECRET_KEY, // Replace with your secret key
            { expiresIn: '1h' } // Token expiration time    
        )

        // Save the user
        // const newUser = await User.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', token, code: 201 });
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' } // Token valid for 1 hour
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;