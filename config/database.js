const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_api_db', 'my_user', 'secure_password', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;