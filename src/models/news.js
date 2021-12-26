const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    link: String,
    imageUrl: String,
    title: String,
    description: String,
    theme: String
})

const news = mongoose.model('News', DataSchema);
module.exports = news;
