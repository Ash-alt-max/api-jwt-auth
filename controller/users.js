const Users = require('../models/User');
const Address = require('../models/Address')

exports.getUserById = async function getUserById(req,res) {
    try {
        //fix
        console.log('getUserById')
        const id = req.params.id;
        const user = await Users.findByPk(id);
        const address = await Address.findAll({
            where:{
                user_id:6
            }
        })
        console.log(address);
        
        
        res.status(200).json({user,address});
    } catch (error) {
        res.status(500).json(error);
        console.error('Error fetching products:', error);
    }
}