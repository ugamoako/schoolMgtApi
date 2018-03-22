var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
  userId: {
      type: String,
      unique: true,
      required: true
  },
  email: {
      type: String,
      unique:true
  },
  password: {
      type: String,
      required: true
  },
  lastName:{
      type:String, 
      required:true
    },
  otherName:{
    type:String,

  },  
  role:{
    type: String,
    enum: ['client','admin','owner'],
    default: 'client' 
  }  
});

// Pre-save of user to database, hash password if password is modified or new
userSchema.pre('save', function (next) {
    const user = this,
      SALT_FACTOR = 5;
  
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });
  
  // Method to compare password for login
  userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return cb(err); }
  
      cb(null, isMatch);
    });
  };

module.exports = mongoose.model('User', userSchema);