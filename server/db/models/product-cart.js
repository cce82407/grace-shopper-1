const { db } = require('../db');

const ProductCart = db.define('productCart', {});

module.exports = ProductCart;