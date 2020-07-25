const express = require('express');
const path = require('path');
const { db, sync } = require('./db/db');
const router = require('./routes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')))
app.use('/api', router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

// sync the db then start the server
sync()
    .then(() => {

        app.listen(PORT, () => console.log('listening on port 3000'));
    })
