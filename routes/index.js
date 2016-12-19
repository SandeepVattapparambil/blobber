///////////////////////////////////////////////////////////////////////////////
//Index routes
/* Instantiate Express Module*/
var express = require('express');
/* Instantiate express router module*/
var router = express.Router();
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');

//Instantiate User Schema
var User = require('../models/user_model.js');
//Instantiate Image model
var Image = require('../models/image_model.js');

//Include FileSystem and File I/O Module
var fs = fs = require('fs');
//Include Folder and Directory structure Module
var path = require('path');

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
        User.findOne({
            user_name: data
        }, function(err, user) {
            if (err) {
                res.json('Error');
            } else if (!user) {
                res.json('No user found');
            } else if (user) {
                res.json('Exists');
            }
        });
    } else {
        res.json('No data send');
    }
});
///////////////////////////////////////////////////////////////////////////////
/* create new user*/
router.post('/add-user', function(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.json('Empty body found');
    } else {
        var logged_user = req.session.user_name;
        var first_name = req.body.firstname;
        var last_name = req.body.lastname;
        var user_name = req.body.username;
        var password = req.body.password_confirm;
        var type = req.body.user_type;
        //console.log(first_name, last_name, user_name, password, type);
        User.create({
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            password: password,
            type: type
        }, function(err, user) {
            if (err) {
                //Cannot create user
                var res_session = req.session;
                res_session.message = 'Error creating new user!';
                res.redirect('/home/' + logged_user + '/settings');
            }
            if (user) {
                //user created
                var res_session = req.session;
                res_session.message = 'Successfully created user : ' + first_name + " " + last_name;
                res.redirect('/home/' + logged_user + '/settings');
            }
        });
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
            var type = user.type;
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
                    password: password,
                    type: type
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
            var message_string = req.session.message;
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
                    message: message_string
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
/* Get total number of images*/
router.get('/home/:user/get-images-count', function(req, res, next) {
    if (req.session.user_name) {
        Image.find(function(err, data) {
            var count = Object.keys(data).length;
            //res.send("<img src=\"data:image/gif;base64, " + img + "\"/>");
            res.json("" + count);
        });
    } else {
        res.setHeader(
            'Content-Type',
            'application/json',
            'charset=utf-8'
        );
        res.send(200, JSON.stringify({
            "message": "Requires Authentication",
            "documentation_url": "https://developer.blobber.com/v1"
        }));
    }
});
///////////////////////////////////////////////////////////////////////////////
/* Get an image*/
router.get('/home/:user/:image_name.:image_type', function(req, res, next) {
    if (req.session.user_name) {
        var image_name = req.params.image_name;
        var image_type = req.params.image_type;
        Image.findOne({
            image_name: image_name,
            image_type: "image/" + image_type
        }, function(err, data) {
            if (err) {
                res.json('Cannot find data');
            }
            if (data == null || data == 0) {
                res.json('Cannot find data');
            } else {
                var file_name = image_name + '.' + image_type;
                var image_buffer = new Buffer(data.image_data, 'base64');
                fs.writeFile('./image_temp/' + file_name + '', image_buffer, function(err, data) {
                    if (err) {
                        res.json('Cannot create image');
                    }
                    res.sendFile(path.resolve('./image_temp/' + file_name));
                });
            }
        });
    } else {
        res.setHeader(
            'Content-Type',
            'application/json',
            'charset=utf-8'
        );
        res.send(200, JSON.stringify({
            "message": "Requires Authentication",
            "documentation_url": "https://developer.blobber.com/v1"
        }));
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
