var express = require('express');
var router = express.Router();

var passport = require('passport');

router.get('/', function(req, res, next) {

    passport.authenticate('oauth2');

    res.send('server@login > RESPONSE');
    console.log('server@login > RESPONSE');

});

module.exports = router;
