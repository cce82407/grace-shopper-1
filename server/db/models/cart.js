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

Cart.prototype.addItem = async function (productId){
    const addedProduct = await Product.findOne({where: { id: productId }});
    await ProductCart.create({
        productId: addedProduct.id,
        cartId: this.id 
    })
}
 
Cart.prototype.getTotal = async function(){
    const products = await ProductCart.findAll({where: {cartId: this.id}});
    this.total = products.reduce((accum, currentProduct)=>{
        return accum + currentProduct.price
    }, 0)
}

Cart.prototype.deleteProduct = async function(productId){
    const deletedProduct = await ProductCart.findOne({where: {productId}});
    await deletedProduct.destroy();
}

module.exports = Cart;