var express = require('express');
var router = express.Router();
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');
//Check MongoDB service is running or not
var connect_db = mongoose.connect('mongodb://localhost/blobber');
if (connect_db) {
    console.log("\nDatabase connection available!");
}
else if(error){
  console.log(error);
}
// Mongoose Schema definition
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name: String,
    lastname: String,
    user_name: String,
    password: String
});
// Mongoose Model definition
var User = mongoose.model('users', UserSchema);

/* Login page. */
router.post('/login', function(req, res, next) {
  if(req.body.username && req.body.password){
    User.find({username:req.body.username, password:req.body.password}, function(err){
      res.render('index', {
          message: 'User Not Found'
      });
    });
  }
});

module.exports = router;
