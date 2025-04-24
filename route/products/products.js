const express = require('express');
const authenticateToken = require('../../middleware/authMiddleware'); // Import the authentication middleware
const productController = require('../../controller/products');
const router = express.Router();

// router.use(authenticateToken); // Protect all routes in this router

router.post('/addProducts',authenticateToken, productController.createProduct); // Insert a new product
router.get('/products', productController.getProducts); // Get all addProducts
router.get('/products/:id',authenticateToken, productController.getProductById); // Get a product by ID
router.put('/products/:id',authenticateToken, productController.updateProduct); // Update a product by ID

module.exports = router;