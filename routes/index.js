var express = require('express');
var router = express.Router();
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');

//Check MongoDB service is running or not
var db = mongoose.connect('mongodb://localhost/blobber');
if (db) {
    console.log('Database Service is running and accesible!');
}

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
    db.blobber.findOne({
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
