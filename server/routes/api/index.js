const app = require('express').Router();

app.use('/products', require('./products'));
app.use('/categories', require('./categories'));
app.use('/sessions', require('./sessions'));
app.use('/orders', require('./orders'));

module.exports = app;
