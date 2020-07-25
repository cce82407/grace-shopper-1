const { db } = require('../db');
const { UUID, UUIDV4, STRING, ENUM } = require('sequelize');

const User = db.define('User', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: ENUM,
        values: ['customer', 'admin', 'guest'],
        allowNull: false
    }
})

module.exports = {
    User
}