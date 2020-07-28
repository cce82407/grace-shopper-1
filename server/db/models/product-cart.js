const { db } = require('../db');
const { INTEGER } = require('sequelize');

const ProductCart = db.define('productCart', {
    quantity: {
        type: INTEGER,
        defaultValue: 0
    }
});

module.exports = ProductCart;