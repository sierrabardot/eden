const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: path.resolve(__dirname, '..', '..', '.env'),
    });
}

const express = require('express');
const logger = require('morgan');
const checkToken = require('./middleware/checkToken');
const usersApi = require('./routes/api/users');

// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

app.use(checkToken);

app.use('/api/users', usersApi);

app.get('/*', function (req, res) {
    res.sendFile(
        path.join(__dirname, '..', '..', 'client', 'dist', 'index.html')
    );
});

const port = +process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});
