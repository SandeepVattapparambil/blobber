////////////////////////////////////////////////////////////////////////////////
//API routes
/* Instantiate Express Module*/
var express = require('express');
/* Instantiate Express Router*/
var router = express.Router();

//Instantiate Image model
var Image = require('../models/image_model.js');
//Instantiate User model
var User = require('../models/user_model.js');

////////////////////////////////////////////////////////////////////////////////
/* API */
router.get('/', function(req, res, next) {
    res.setHeader(
        'Content-Type',
        'application/json',
        'charset=utf-8'
    );
    res.send(200, JSON.stringify({
        "message": "Requires Authentication",
        "documentation_url": "https://developer.blobber.com/v1"
    }));
});
///////////////////////////////////////////////////////////////////////////////
module.exports = router;
////////////////////////////////////////////////////////////////////////////////
