const express = require('express');
const authenticateToken = require('../../middleware/authMiddleware'); // Import the authentication middleware

const router = express.Router();
console.log('Admin router loaded________________'); // Debugging statement

router.use(authenticateToken); // Protect all routes in this router

router.get('/profile', (req, res) => {
    res.json({ message: `User profile for ID: ` });
});

router.get('/settings', (req, res) => {
    res.json({ message: 'User settings' });
});

module.exports = router