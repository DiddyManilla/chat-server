var express = require('express');
var router = express.Router();

router.route('/')
    .get(function(request, response) {
        response.status(200);
        response.sendFile(__dirname + "/index.html");
    });
    
module.exports = router;