const express = require('express');
const authenticateToken = require('../../middleware/authMiddleware'); // Import the authentication middleware
const addressController = require('../../controller/address'); // Import the address controller
const router = express.Router();

router.use(authenticateToken); // Protect all routes in this router

router.get('/address', addressController.getAddress); // Get all addresses

module.exports = router;