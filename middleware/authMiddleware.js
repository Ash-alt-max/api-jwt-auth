const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Store this securely using environment variables

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Expecting "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY); // Validate token using the secret key
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Move to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = authenticateToken; // Export the middleware