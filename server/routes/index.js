const { Router } = require('express');
const router = Router()

const { User } = require('../db/models/index');

router.get('/users', async (req, res)=>{
    users = await User.findAll();
    res.status(200).send(users)
})

module.exports= router;

