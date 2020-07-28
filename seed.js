const { db, sync } = require('./server/db/db');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { User } = require('./server/db/models/index');

const seed = async () => {
    try {
        const user = {
            username: 'rebelalliance',
            password: 'usetheforce',
            role: 'customer',
        }
        
        const products = [
            {
                price: 99.99,
                name: 'Gibson Guitar',
                description: 'fancy lookin guitar'
            },
            {
                price: 40.99,
                name: 'Drums',
                description: 'fancy lookin drums'
            },
            {
                price: 30.99,
                name: 'trumpet'
                description: 'fancy lookin trumpet'
            },
        ]
        const saltRounds = 10;
        bcrypt.hash(user.password, saltRounds)
            .then(hash => user.password = hash)
            .then(() => User.create(user))
            .then(() => console.log(chalk.green('DB SEEDED')));
    } catch (e) {
        console.log(chalk.red('ERROR SEEDING DB'))
    }
}

sync(true)
    .then(() => seed())
    .catch(console.log)