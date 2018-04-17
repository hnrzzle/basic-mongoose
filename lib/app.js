const express = require('express');
const app = express();
const heroes = require('./routes/heroes');

app.use(express.json());

app.use('/heroes', heroes);

module.exports = app;