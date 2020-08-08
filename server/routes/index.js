const apiRouter = require('./apiRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const checkoutRouter = require('./checkoutRouter');
const imageRouter = require('./imageRouter');
const reviewRouter = require('./reviewRouter')

module.exports = [apiRouter, userRouter, cartRouter, checkoutRouter, imageRouter, reviewRouter]
