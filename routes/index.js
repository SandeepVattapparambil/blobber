var express = require('express');
var router = express.Router();
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');
//Check MongoDB service is running or not
var connect_db = mongoose.connect('mongodb://localhost/blobber');
if (connect_db) {
    console.log("\nDatabase connection available!");
} else if (error) {
    console.log(error);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Login'
    });
});

/* Login page. */
router.post('/login', function(req, res) {
    console.log(req.body.username);
    
});


module.exports = router;
