const { db } = require('../db');
const { UUID, UUIDV4, DECIMAL, BOOLEAN } = require('sequelize');

const Cart = db.define('cart', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    total: {
        type: DECIMAL,
        defaultValue: 0
    },
    completed: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports = Cart;