const { DataTypes } = require('sequelize');

const db = require('../db');

const Tasks = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
});

module.exports = Tasks;