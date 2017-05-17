const passport = require('passport');
const keys = require('./config');
// use OAuth2
const OAuth2Strategy = require('passport-oauth2').Strategy;

passport.use(new OAuth2Strategy({
        authorizationURL: keys.authorizationURL,
        tokenURL: keys.tokenURL,
        clientID: keys.clientID,
        clientSecret: keys.secret,
        callbackURL: keys.callbackURL,
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

module.exports = {
    checkOnStart: function (req, res, next) {
        passport.authenticate('oauth2', {failureRedirect: '/error'})(req, res, function () {
            res.cookie('isAuthenticated', true);
            req.query.code = undefined;
            res.redirect('/user')
        })
    }
};