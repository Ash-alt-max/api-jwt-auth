const express = require('express');
const authenticateToken = require('../../middleware/authMiddleware'); // Import the authentication middleware
const productController = require('../../controller/products');
const router = express.Router();
router.use(authenticateToken); // Protect all routes in this router

router.post('/addProducts', productController.createProduct); // Insert a new product

module.exports = router;