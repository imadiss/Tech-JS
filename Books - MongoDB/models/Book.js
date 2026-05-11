const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    userId: String,
});

module.exports = mongoose.model('Book', bookSchema);