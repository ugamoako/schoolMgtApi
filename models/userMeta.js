var mongoose = require('mongoose');
//const config = require('../config/main');
//mongoose.connect(config.database);
var Schema = mongoose.Schema;

var userMetaSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required:[true, 'Please insert student ID']
    },
    schoolId: String,
    gender: String,
    status: String,
    house: String,
    class: { type: Number},
    classMeta: {type: String},
    program: {type: String},
    DOB: {type: String},
    image:{data: Buffer, contentType:String}
});


module.exports = mongoose.model('userMeta', userMetaSchema);