var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schoolDataSchema = new Schema({
    schoolId: {
        type: String,
        unique: true,
        required:[true, 'Please insert school ID']
    },
    name: {
        type: String,
        required:[true, 'please enter school Name']
    },
    headMaster: String,
    region: String,
    city: String,
    district: String,
    street: String,
    pobox: String,
    email: String,
    phone: String,
    image: {data:Buffer, contentType:String}
   
});

module.exports = mongoose.model('schoolData', schoolDataSchema);