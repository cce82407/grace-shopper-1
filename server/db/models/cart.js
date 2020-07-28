const { db } = require('../db');
const { UUID, UUIDV4, DECIMAL, BOOLEAN } = require('sequelize');

const Product = require('./product');
const ProductCart = require('./product-cart');

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

Cart.prototype.addItem = async function (productId, quantity = 1) {
    const addedProduct = await Product.findOne({ where: { id: productId } });
    const productCart = await ProductCart.findOne({
        where: {
            productId,
            cartId: this.id
        }
    });
    if (productCart) {
        productCart.quantity += +quantity
        productCart.save();
    } else {
        await ProductCart.create({
            productId: addedProduct.id,
            cartId: this.id,
            quantity
        })

    }
}

Cart.prototype.getTotal = async function () {
    const products = await ProductCart.findAll({ where: { cartId: this.id } });
    this.total = products.reduce((accum, currentProduct) => {
        return accum + currentProduct.price
    }, 0)
}

Cart.prototype.deleteProduct = async function (productId) {
    const deletedProduct = await ProductCart.findOne({ where: { productId } });
    await deletedProduct.destroy();
}

module.exports = Cart;