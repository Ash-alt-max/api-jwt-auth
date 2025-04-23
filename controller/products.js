const Product = require('../models/Product'); // Adjust the path to your Product model

// Insert a new product
exports.createProduct = async function createProduct(req, res) {
    try {
        console.log(req.body);
        const newProduct = await Product.create(req.body);
        console.log('Product created:', newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
        console.error('Error inserting product:', error);
    }
}

// module.exports = createProduct();