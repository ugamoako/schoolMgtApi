var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var userMeta = require('../models/userMeta');

// CREATES A NEW USER
exports.postData = function (req, res, next) {
    //res.send('hello it works');
    userMeta.create({
            userId : req.body.userId,
            gender: req.body.gender,
            status: req.body.status,
            house: req.body.house,
            class : req.body.class,
            classMeta:req.body.classMeta,
            program : req.body.program,
            DOB: req.body.DOB,
            schoolId: req.body.schoolId,
            image: req.body.image
        },
        function (err, userMeta) {
            if (err) return res.status(500).send(err);
            res.status(200).send(userMeta);
        });
    //return res.status(200);
}
router.post('/', function (req, res) {
    res.send('hello it works');
    /*UserMeta.create({
            userId : req.body.userId,
            class : req.body.class,
            program : req.body.program,
            DOB: req.body.DOB,
            schoolID: req.body.schoolID
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });*/
});

// RETURNS ALL THE USERS IN THE DATABASE
exports.getUserMetaAll = function (req, res, next) {
//router.get('/', function (req, res) {
    userMeta.find({}, function (err, allUserMetas) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(allUserMetas);
    });
};

// GETS A SINGLE USER FROM THE DATABASE
exports.getUserMeta = function (req, res, next) {
    let userId = req.params.userId;
    console.log('user Id ',req.params.userId);
    userMeta.findOne({'userId':userId}, function (err, user) {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
};

// DELETES A USER FROM THE DATABASE
exports.deleteUserMeta = (req,res)=>{
    //let userId = req.params.userId;
    userMeta.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ userMeta.name +" was deleted.");
    }); 
}
/*router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});*/

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
exports.updateUserMeta = (req,res)=>{
    userMeta.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
}
/*router.put('/:id', /* VerifyToken function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});*/


//module.exports = router;



