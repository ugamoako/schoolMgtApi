const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
const schoolData = require('../models/schoolData');

// CREATES A NEW USER
exports.postSchoolData = function (req, res, next) {
    //res.send('hello it works');
    schoolData.create({
            schoolId : req.body.schoolId,
            name : req.body.name,
            region: req.body.region,
            city: req.body.city,
            district: req.body.district,
            street: req.body.street,
            pobox: req.body.pobox,
            email: req.body.email,
            phone: req.body.phone
        },
        function (err, schoolData) {
            if (err) return res.status(500).send(err);
            res.status(200).send(schoolData);
        });
    //return res.status(200);
}
router.post('/', function (req, res) {
    res.send('hello it works');
    
});

// RETURNS ALL THE USERS IN THE DATABASE
exports.getSchoolDataAll = function (req, res, next) {
    schoolData.find({}, function (err, schoolData) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(schoolData);
    });
};

// GETS A SINGLE USER FROM THE DATABASE
exports.getSchoolData = function (req, res, next) {
    let schoolId = req.params.userId;
    console.log('school Id ',req.params.userId);
    schoolData.findOne({'schoolId':schoolId}, function (err, user) {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send("No school found.");
        res.status(200).send(user);
    });
};

// DELETES A USER FROM THE DATABASE
exports.deleteSchoolData = (req,res)=>{
    //let userId = req.params.userId;
    schoolData.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ schoolData.name +" was deleted.");
    }); 
}
// UPDATES A SINGLE USER IN THE DATABASE
exports.updateSchoolData = (req,res)=>{
    schoolData.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
}