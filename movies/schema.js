const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: String,
    rating: Number
}, {collection: 'movies'});
module.exports = schema;
