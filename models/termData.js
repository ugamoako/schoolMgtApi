var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var termDataSchema = new Schema({
    studentID: {
        type: string,
        required:[true, 'Please insert school ID']
    },
    termNum:{type: number,maxlength:1},
    classTeacherRemarks: {type: string},
    headMasterRemarks: {type, string},
    Attendance: { type: string},
    numberOnRoll: {type, number}
   
})