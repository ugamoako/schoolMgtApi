var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var termDataSchema = new Schema({
    studentId: {
        type: String,
        required:[true, 'Please insert student ID']
    },
    term:{type: Number,maxlength:1},
    academicYr:{type: Number},
    classTeacherRemarks: {type: String},
    headMasterRemarks: {type: String},
    attendance: { type: String},
    numberOnRoll: {type: Number}
   
});

module.exports = mongoose.model('termData', termDataSchema);