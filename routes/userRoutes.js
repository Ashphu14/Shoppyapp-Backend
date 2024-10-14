 
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        
        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to log in a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Respond with the user data (you may want to include a token here)
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
