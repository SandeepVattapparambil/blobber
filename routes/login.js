var express = require('express');
var router = express.Router();
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');
//Check MongoDB service is running or not
var connect_db = mongoose.connect('mongodb://localhost/blobber');
if (connect_db) {
    console.log("\nDatabase connection available!");
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Login'
    });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  connect_db.blobber_user.find({username:"" +username, password:"" +passwrod});
});

module.exports = router;
