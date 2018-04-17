const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
  const userId = req.params.userId;

  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({ user: userToReturn });
  });
};
// RETURNS ALL THE USERS IN THE DATABASE
exports.getAllUser = function (req, res, next) {
  //router.get('/', function (req, res) {
      User.find({}, function (err, allUser) {
          if (err) return res.status(500).send("There was a problem finding the users.");
          res.status(200).send(allUser);
      });
  };