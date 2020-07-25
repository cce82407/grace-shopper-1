const express = require('express');
const path = require('path');
const { db, sync } = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

sync()
    .then(() => {

        app.listen(PORT, () => console.log('listening on port 3000'));
    })
