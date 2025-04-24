const express = require('express');
const authenticateToken = require('../../middleware/authMiddleware'); // Import the authentication middleware
const productController = require('../../controller/users');
const router = express.Router();

router.use(authenticateToken); // Protect all routes in this router

router.get('/user/:id', productController.getUserById); // Insert a new product

module.exports = router;