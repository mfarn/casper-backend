const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    password: String,
})

const admin = mongoose.model('Admin', DataSchema);
module.exports = admin;