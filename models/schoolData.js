var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schoolDataSchema = new Schema({
    schoolID: {
        type: string,
        unique: true,
        required:[true, 'Please insert school ID']
    },
    name: {
        type: string,
        required:[true, 'please enter surname']
    },
    address: {type, string},
    email: { type: string},
    phone: {type, number}
   
})