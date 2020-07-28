const { db } = require('../db');
const { UUID, UUIDV4, DECIMAL, BOOLEAN } = require('sequelize');
const Product = require('./product');
const ProductCart=require('./product-cart');


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

Cart.prototype.addItem = function (productID){
    const addedProduct = Product.findOne({where: { id: productID }});
    ProductCart.create({
        productId: addedProduct.id,
        categoryId: this.id 
    })
}

Cart.prototype.getTotal = function(){
    const products = ProductCart.findAll({where: {cartId: this.id}});
    this.total = products.reduce((accum, currentProduct)=>{
        return accum + currentProduct.price
    }, 0)
}

module.exports = Cart;