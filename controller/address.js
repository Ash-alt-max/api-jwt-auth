const Address = require('../models/Address');

exports.getAddress = async function getAddress(req, res) {
    try {
        const address = await Address.findAll();
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json(error);
        console.error('Error inserting product:', error);
    }
}