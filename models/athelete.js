var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var atheleteSchema = new Schema({
    firstname: String,
    lastname: String,
    town: String,
    photo: String
});



var Athelete = mongoose.model('Athelete', atheleteSchema);

module.exports = Athelete;