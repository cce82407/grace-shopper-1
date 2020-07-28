const { Router } = require("express");
const apiRouter = Router();

const { User, Product } = require("../db/models/index");


apiRouter.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.status(200).send(users);
});

apiRouter.get("/products", async (req, res) => {
    const products = await Product.findAll();
    res.status(200).send(products);
});

module.exports = {
    path: '/api',
    router: apiRouter
};