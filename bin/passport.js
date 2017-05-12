var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2').Strategy;

var keys = require('./config');

passport.use('oauth2', new OAuth2Strategy({
        authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
        tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
        clientID: keys.clientID,
        clientSecret: keys.secret,
        callbackURL: "http://localhost:3000/"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(' ---> called');
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        console.log(cb);
    }
));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = function (app) {
};
