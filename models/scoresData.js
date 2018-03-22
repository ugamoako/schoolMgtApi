var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreDataSchema = new Schema({
    studentID: {
        type: string,
        required:[true, 'Please insert student ID']
    },
    class: {
        type: string,
        required:[true, 'please enter surname']
    },
    subject: {type, string},
    classScore: { type: number},
    examScore: {type, number},
    term:{type, number}
   
})