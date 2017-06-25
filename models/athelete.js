var mongoose = require('mongoose');

module.exports = mongoose.model('Athelete',{
    firstname: String,
    lastname: String,
    town: String
});