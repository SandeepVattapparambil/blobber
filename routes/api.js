var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        message: "Requires Authentication",
        documentation_url: "https://developer.blobber.com/v1"
    }));
});

module.exports = router;
