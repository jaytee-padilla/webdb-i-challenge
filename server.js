const express = require('express');
const server = express();
const db = require('./data/dbConfig.js');

server.use(express.json());

// routes
const accountsRoute = require('./routes/accountsRoute');
server.use('/accounts', accountsRoute);

// api check
server.get('/', (req, res) => {
	res.send(`<h1>API is running</h1>`);
});

module.exports = server;