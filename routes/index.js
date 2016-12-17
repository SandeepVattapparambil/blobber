///////////////////////////////////////////////////////////////////////////////
//Index routes
/* Instantiate Express Module*/
var express = require('express');
/* Instantiate express router module*/
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
    password: String,
    type: String
}, {
    collection: 'blobber_user'
});
//Instantiate User Schema
var User = mongoose.model('User', userSchema);
///////////////////////////////////////////////////////////////////////////////
//Check MongoDB service is running or not
var db = mongoose.connect('mongodb://localhost/blobber', function(err, db_connect) {
    if (db_connect) {
        console.log('Database Service is running and accesible!');
    } else if (err) {
        console.log('⚠️ Database Service is not running!');
    }
});
///////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////
/* Get all data from selected collection */
router.get('/get-data', function(req, res, next) {
    User.find()
        .then(function(doc) {
            res.render('test', {
                title: doc
            });
        });
});
///////////////////////////////////////////////////////////////////////////////
/* Get all users*/
router.get('/get-all-users', function(req, res, next) {
    User.find()
        .then(function(doc) {
            res.setHeader(
                'Content-Type',
                'application/json',
                'charset=utf-8'
            );
            res.status(200).send(doc);
        });

});
///////////////////////////////////////////////////////////////////////////////
/* Login page. */
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({
        user_name: username,
        password: password
    }, function(err, user) {
        if (err) {
            res.redirect('/');
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
///////////////////////////////////////////////////////////////////////////////
/* check user_name */
router.post('/check-user_name', function(req, res, next) {
    if (req.body.username) {
        var data = req.body.username;
        res.send(JSON.stringify(data));
    } else {
        res.send('username not set');
    }
});
///////////////////////////////////////////////////////////////////////////////
/* Get Home */
router.get('/home', function(req, res, next) {
    if (req.session) {
        if (req.session.user_name && req.session.user_name != null) {
            var user = req.session.user_name;
            res.render('home', {
                message: "Welcome " + user,
                user: user
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});
///////////////////////////////////////////////////////////////////////////////
/* Get Profile */
router.get('/home/:user', function(req, res, next) {
    if (req.session) {
        if (req.session.user_name && req.session.user_name != null) {
            var user = req.session.user_name;
            User.findOne({
                user_name: user
            }, function(err, user) {
                if (err) {
                    var message = 'Cannot find user!';
                    res.redirect('/');
                }
                var first_name = user.first_name;
                var last_name = user.last_name;
                var user_name = user.user_name;
                var password = user.password;
                var user_type = user.type;
                res.render('profile', {
                    message: "",
                    first_name: first_name,
                    last_name: last_name,
                    user_name: user_name,
                    password: password,
                    type: user_type
                });
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});
///////////////////////////////////////////////////////////////////////////////
/* Update profile form */
router.post('/update_profile', function(req, res, next) {
    if (req.session && req.body) {
        //for identification only
        var identifier = req.session.user_name;
        console.log(identifier);
        //form data
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var user_name = req.body.user_name;
        var password = req.body.password;
        User.findOne({
            user_name: identifier
        }, function(err, user) {
            if (err) {
                var message = 'Cannot find user!';
                res.redirect('/');
            }
            User.update({
                first_name: first_name,
                last_name: last_name,
                user_name: user_name,
                password: password
            }, function(err, user) {
                if (err) {
                    var message = 'Cannot update user!';
                    res.redirect('/');
                }
                res.render('profile', {
                    message: "Successfully updated " + identifier,
                    first_name: first_name,
                    last_name: last_name,
                    user_name: user_name,
                    password: password
                });
            });

        });
    }
});
///////////////////////////////////////////////////////////////////////////////
/* Get Settings */
router.get('/home/:user/settings', function(req, res, next) {
    if (req.session) {
        if (req.session.user_name && req.session.user_name != null) {
            var user = req.session.user_name;
            User.findOne({
                user_name: user
            }, function(err, user) {
                if (err) {
                    res.redirect('/');
                }
                var first_name = user.first_name;
                var last_name = user.last_name;
                var user_name = user.user_name;
                var full_name = first_name + " " + last_name;
                res.render('settings', {
                    full_name: full_name,
                    user: user_name,
                    message: ''
                });
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});
///////////////////////////////////////////////////////////////////////////////
/* Logout */
router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.user_name = '';
    }
    var logout_session = req.session;
    logout_session.message = 'You have logged out !'
    res.redirect('/');
});
///////////////////////////////////////////////////////////////////////////////
module.exports = router;
