'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('Error en la conexion', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Conectando a MongoDB en', mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = mongoose.connection;

