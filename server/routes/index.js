const apiRouter = require('./apiRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const checkoutRouter=require('./checkoutRouter');

module.exports = [apiRouter, userRouter, cartRouter, checkoutRouter]