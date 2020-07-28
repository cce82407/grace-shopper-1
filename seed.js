const { db, sync } = require('./server/db/db');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { User, Product, Category } = require('./server/db/models/index');

const categories = [
    {
        name: 'electric'
    },
    {
        name: 'acoustic'
    }
];

const electricGuitars = [
    {
        name: 'fender',
        price: 1000,
        description: 'it\'s awesome'
    },
    {
        name: 'gibson',
        price: 2000,
        description: 'it\'s more awesome'
    },
]
const acousticGuitars = [
    {
        name: 'taylor',
        price: 1000,
        description: 'it\'s kinda awesome'
    },
    {
        name: 'martin',
        price: 2000,
        description: 'it\'s more kinda awesome'
    },
]

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

        const [electric, acoustic] = await Promise.all(categories.map(cat => {
            return Category.create(cat);
        }));

        await Promise.all(electricGuitars.map(guitar => {
            guitar.categoryId = electric.id;
            return Product.create(guitar);
        }));

        await Promise.all(acousticGuitars.map(guitar => {
            guitar.categoryId = acoustic.id;
            return Product.create(guitar);
        }));

    } catch (e) {
        console.log(chalk.red('ERROR SEEDING DB'), e)
    }
}

sync(true)
    .then(() => seed())
    .catch(console.log)