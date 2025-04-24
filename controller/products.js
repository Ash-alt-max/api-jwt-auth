const Product = require('../models/Product'); // Adjust the path to your Product model

// Insert a new product
exports.createProduct = async function createProduct(req, res) {
    try {
        console.log(req.body);
        const newProduct = await Product.create(req.body);
        console.log('Product created:', newProduct);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
        console.error('Error inserting product:', error);
    }
}

exports.getProducts = async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
        console.error('Error fetching products:', error);
    }
}

exports.getProductById = async function getProductById(req, res) {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
        console.error('Error fetching product by ID:', error);
    }
}

exports.updateProduct = async function updateProduct(req, res) {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.update(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
        console.error('Error updating product:', error);
    }
}

// module.exports = createProduct();