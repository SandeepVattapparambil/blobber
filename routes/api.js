var express = require('express');
var router = express.Router();

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

module.exports = router;
