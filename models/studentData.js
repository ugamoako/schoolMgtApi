var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentDataSchema = new Schema({
    studentID: {
        type: string,
        unique: true,
        required:[true, 'Please insert student ID']
    },
    surname: {
        type: string,
        required:[true, 'please enter surname']
    },
    otherNames: {type, string},
    class: { type: string},
    programme: {type, string},
    DOB: {type, date},
    schoolID: {type, string}
})