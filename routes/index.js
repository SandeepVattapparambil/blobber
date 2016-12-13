var express = require('express');
var router = express.Router();
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');
//Instantiate Mongoose Schema
var Schema = mongoose.Schema;
//Define User Schema
var userSchema = new Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    password: String
}, {
    collection: 'blobber_user'
});
//Instantiate User Schema
var User = mongoose.model('User', userSchema);

//Check MongoDB service is running or not
var db = mongoose.connect('mongodb://localhost/blobber', function(err, db_connect) {
    if (db_connect) {
        console.log('Database Service is running and accesible!');
    } else if (err) {
        console.log('⚠️ Database Service is not running!');
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session){
    var message_string = req.session.sess_message;
  }
  else{
    var message_string = '';
  }
    res.render('index', {
        title: 'Login',
        message: message_string
    });
});
/* Get all data from selected collection */
router.get('/get-data', function(req, res, next) {
    User.find()
        .then(function(doc) {
            res.render('test', {
                title: doc
            });
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
            console.log(err);
            return next(err);
        }
        if (!user) {
            return res.render('index', {
                title: 'Login',
                message: "😯 No user found!"
            });
        }
        var session = req.session;
        session.user_name = encodeURIComponent(username);
        res.redirect('/home');
    });
});
/* Get Home */
router.get('/home', function(req, res, next) {
    if (req.session) {
        var user = req.session.user_name;
    }
    res.render('home', {
        message: "Welcome " + user,
        user: user
    });
});

/* Logout */
router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy();
    }
    var session = req.session;
    session.sess_message = 'You have logged out!';
    res.redirect('/');
});
module.exports = router;
