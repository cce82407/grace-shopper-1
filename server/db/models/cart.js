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

Cart.prototype.addItem = async function (productId, quantity) {
    const addedProduct = await Product.findOne({ where: { id: productId } });
    const productCart = await ProductCart.findOne({
        where: {
            productId,
            cartId: this.id
        }
    });
    if (productCart) {
        const newQuantity = productCart.quantity += +quantity
        await productCart.update({
            quantity: newQuantity
        });
    } else {
        await ProductCart.create({
            productId: addedProduct.id,
            cartId: this.id,
            quantity: quantity
        })
    }
    await this.getTotal();
}

Cart.prototype.getTotal = async function () {
    const products = await ProductCart.findAll({ where: { cartId: this.id } });
    const total = await products.reduce(async (accum, currentProduct) => {
        const product = await Product.findByPk(currentProduct.productId);
        return await accum + +product.price * +currentProduct.quantity
    }, 0)
    console.log(typeof total, total)
    await this.update({ total });
}

Cart.prototype.deleteProduct = async function (productId) {
    const deletedProduct = await ProductCart.findOne({ where: { productId } });
    await deletedProduct.destroy();
}

module.exports = Cart;