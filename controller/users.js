const Users = require('../models/User');
const Address = require('../models/Address');
const sequelize = require('../config/database');
// import nodemailer from 'nodemailer';

exports.getUserById = async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const query = "SELECT * FROM get_user_by_id($1)"; // Ensure correct syntax for the function
        const values = [parseInt(id)];
        sequelize.query(query, { bind: values, type: sequelize.QueryTypes.SELECT })
            .then((result) => {
                if (result.length > 0) {
                    console.log(result); // Logs the first row
                    const groupedData = result.reduce((acc, item) => {
                        const key = item.id;
                        if (!acc[key]) {
                            acc[key] = [];
                        }
                        acc[key].push(item);
                        return acc;
                    }, {});

                    const response = {
                        id: groupedData[id][0].id,
                        username: groupedData[id][0].username,
                        email: groupedData[id][0].email,
                        addresses: groupedData[id].map(item => ({
                            address_id: item.address_id,
                            street_name: item.street_name,
                            city: item.city,
                            state: item.state,
                            postal_code: item.postal_code,
                            country: item.country,
                            created_at: item.created_at,
                            updated_at: item.updated_at
                        })
                        )
                    };
                    res.status(200).json(response); // Sends the result useras a JSON response
                } else {
                    res.status(404).json({ message: "User not found" }); // Handles case when no user is returned
                }
            })
            .catch((error) => {
                console.error("Error executing query:", error);
                res.status(500).json({ error: "Internal server error" });
            });
        // const user = await Users.findByPk(id);
        // const address = await Address.findAll({
        //     where:{
        //         user_id:6
        //     }
        // })
        // console.log(address);


        // res.status(200).json({ user, address });
    } catch (error) {
        res.status(500).json(error);
        console.error('Error fetching products:', error);
    }
}
