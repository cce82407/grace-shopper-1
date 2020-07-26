const express = require('express');
const path = require('path');
const { sync } = require('./db/db');
const router = require('./routes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/client/assets', express.static(path.join(__dirname, '../client/assets')))
app.use(express.static(path.join(__dirname, '../dist')))
app.use('/api', router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: err.message });
});

// sync the db then start the server
sync(false)
    .then(() => {
        app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
    })
