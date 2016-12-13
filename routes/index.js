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
    }
    else if (err) {
        console.log('⚠️ Database Service is not running!');
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Login',
        message: ''
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
        /*return res.render('home',{
          user:username,
          message:'Welcome'
        });*/
        var string = encodeURIComponent('Welcome ' + username);
        res.redirect('/home/:query=' + string);
    });
});
/* Get Home */
router.get('/home', function(req, res, next) {
    if (req.query.query) {
        var message = req.query.query;
    }
    res.render('home', {
      message: message
    });
});

module.exports = router;
