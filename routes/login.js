var express = require('express');
var loginRouter = express.Router();

var passport = require('passport');

var OAuth2Strategy = require('passport-oauth2').Strategy;

var keys = require('../bin/config');

loginRouter.get('/', function(req, res, next) {
    res.send('server@login > RESPONSE');
    console.log('server@login > RESPONSE');

    pass();
    passport.authenticate('strat');

});

function pass () {
    passport.use('strat', new OAuth2Strategy({
            authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
            tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
            clientID: keys.clientID,
            clientSecret: keys.secret,
            callbackURL: "http://localhost:3000/"
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log('callback');
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            console.log(cb);
        }
    ));
}

module.exports = loginRouter;
