const mongoose = require('mongoose');
const schema = require('./schema');
const model = mongoose.model('MovieModel', schema);
module.exports = model;
