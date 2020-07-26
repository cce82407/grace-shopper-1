const { db } = require('../db');
const { UUID, UUIDV4, DECIMAL, BOOLEAN } = require('sequelize');
const Product = require('./product');

const Cart = db.define('cart', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    total:{
       type: DECIMAL,
       defaultValue: 0
    },
    active:{
        type: BOOLEAN,
        defaultValue:true,
        allowNull: false
    }
});

module.exports = Cart;