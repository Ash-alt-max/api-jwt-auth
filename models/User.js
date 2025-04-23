const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    createdat: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedat: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    timestamps: true, // Enable timestamps
});

module.exports = User;