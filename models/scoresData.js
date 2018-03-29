var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreDataSchema = new Schema({
    studentId: {
        type: String,
        required:[true, 'Please select student']
    },
    schoolId: {
        type:String,
        required:[true, 'school Id not found']
    },
    class: {
        type: Number,
        required:[true, 'class not selected']
    },
    term:{
        type: Number,
        required:[true, 'term not selected']
    },
    year:{
        type: Number,
        required:[true, 'year not selected']
    },
    subject: {type: String},
    classScore: { type: Number},
    examScore: {type: Number},
    
   
});

module.exports = mongoose.model('scoreData', scoreDataSchema);