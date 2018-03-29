const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
const scoreData = require('../models/scoresData');

// CREATES A NEW USER
exports.postScore = function (req, res, next) {
    //res.send('hello it works');
    scoreData.create({
            studentId : req.body.studentId,
            schoolId: req.body.schoolId,
            year: req.body.year,
            class : req.body.class,
            subject : req.body.subject,
            classScore: req.body.classScore,
            examScore: req.body.examScore,
            term: req.body.term
        },
        function (err, scoreData) {
            if (err) return res.status(500).send(err);
            res.status(200).send(scoreData);
        });
    //return res.status(200);
}
router.post('/', function (req, res) {
    res.send('hello it works');
    
});
function getData(query,res){
    console.log('parameters: ', query);
    scoreData.find(query, function (err, user) {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
}
// RETURNS ALL THE USERS IN THE DATABASE
exports.getScoreDataAll = function (req, res, next) {
    console.log('parameters: ',req.params);
    scoreData.find({}, function (err, scoreData) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(scoreData);
    });
};

// GETS A DATA USER FROM THE DATABASE
exports.getScoreI = function (req, res, next) {
    const query = {studentId:req.params.studentId};
    getData(query,res);
};
exports.getScoreICT = function (req, res, next) {
    let query = {studentId:req.params.studentId,class:req.params.class,term:req.params.term};
    getData(query,res);
};
exports.getScoreSYCT = function (req, res, next) {
    let query = {schoolId:req.params.schoolId,year:req.params.year,class:req.params.class,term:req.params.term};
    getData(query,res);
};
exports.getScoreSYCTS = function (req, res, next) {
    let query = {schoolId:req.params.schoolId,year:req.params.year,class:req.params.class,term:req.params.term,subject:req.params.subject};
    getData(query,res);
};
// DELETES A USER FROM THE DATABASE
exports.deleteScoreData = (req,res)=>{
    //let userId = req.params.userId;
    scoreData.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("Score for "+ scoreData.subject +" was deleted.");
    }); 
}
// UPDATES A SINGLE USER IN THE DATABASE
exports.updateScoreData = (req,res)=>{
    scoreData.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
}