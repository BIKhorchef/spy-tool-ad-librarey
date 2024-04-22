const express = require('express');
const cors = require('cors'); // Import CORS here as well
const routes = require('./routes'); // Make sure this path is correct

const app = express();

app.use(express.json());
app.use(cors()); // Use CORS before your routes
app.use('/', routes);

module.exports = app;
