var passport = require('passport');
var keys = require('./config');
// use OAuth2
var OAuth2Strategy = require('passport-oauth2').Strategy;

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
        tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
        clientID: keys.clientID,
        clientSecret: keys.secret,
        callbackURL: "http://localhost:3000",
        passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
        // write accessToken into the session
        req.session.accessToken = accessToken;
        // establish authenticated session
        req.session.authed = true;
        // send an empty profile
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user);
});
