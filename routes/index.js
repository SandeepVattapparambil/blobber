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
    if (req.session) {
        var message_string = req.session.message;
    } else {
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

/* Get Profile */
router.get('/home/:user', function(req, res, next) {
    if (req.session) {
        var user = req.session.user_name;
    }
    ///console.log(user);
    User.findOne({
        user_name: user
    }, function(err, user) {
        if (err) {
            var message = 'Cannot find user!';
        }
        //console.log(user);
        var first_name = user.first_name;
        var last_name = user.last_name;
        var user_name = user.user_name;
        var password = user.password;
    });
    res.render('profile', {
        user: user,
        first_name: firstName
    });
});

/* Logout */
router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.user_name = '';
    }
    var logout_session = req.session;
    logout_session.message = 'You have logged out !'
    res.redirect('/');
});

module.exports = router;
