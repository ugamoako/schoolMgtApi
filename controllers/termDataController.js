const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
const termData = require('../models/termData');

// CREATES A NEW USER
exports.postTermData = function (req, res, next) {
    //res.send('hello it works');
    termData.create({
            studentId : req.body.studentId,
            term : req.body.term,
            academicYr : req.body.academicYr,
            classTecherRemarks: req.body.classTeacherRemarks,
            headMasterRemarks: req.body.headMasterRemarks,
            attendance: req.body.attendance,
            numberOnroll: req.body.numberOnroll
        },
        function (err, termData) {
            if (err) return res.status(500).send(err);
            res.status(200).send(termData);
        });
    //return res.status(200);
}
router.post('/', function (req, res) {
    res.send('hello it works');
    
});

// RETURNS ALL THE USERS IN THE DATABASE
exports.getTermDataAll = function (req, res, next) {
    termData.find({}, function (err, termData) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(termData);
    });
};

// GETS A SINGLE USER FROM THE DATABASE
exports.getTermData = function (req, res, next) {
    let userId = req.params.userId;
    console.log('user Id ',req.params.userId);
    termData.find({'userId':userId}, function (err, user) {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
};

// DELETES A USER FROM THE DATABASE
exports.deleteTermData = (req,res)=>{
    //let userId = req.params.userId;
    termData.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("Score for "+ termData.subject +" was deleted.");
    }); 
}
// UPDATES A SINGLE USER IN THE DATABASE
exports.updateTermData = (req,res)=>{
    termData.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
}