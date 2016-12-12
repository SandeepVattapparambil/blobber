var express = require('express');
var router = express.Router();
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');
//Instantiate Mongoose Schema
var Schema = mongoose.Schema;
//Define User Schema
var userSchema = new Schema({
  first_name:  String,
  last_name: String,
  user_name: String,
  password: String
});
//Instantiate User Schema
var User = mongoose.model('User', userSchema);

//Check MongoDB service is running or not
var db = mongoose.connect('mongodb://localhost/blobber', function(err, db){
  if (db) {
      console.log('Database Service is running and accesible!');
  }
  if(err){
    console.log('⚠️ Database Service is not running!');
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Login'
    });
});

/* Login page. */
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + password);
    User.findOne({
        user_name: username,
        password: password
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('No user found!');
        }
        req.session.user = username;
        return res.send('Welcome!');
    });
});


module.exports = router;
