var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json', 'charset=utf-8');
    res.json({
        "message": "Requires Authentication",
        "documentation_url": "https://developer.blobber.com/v1"
    });
});

module.exports = router;
