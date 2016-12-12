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

/* Login page. */
router.post('/login', function(req, res, next) {
    console.log(req.body.username);
});

module.exports = router;
