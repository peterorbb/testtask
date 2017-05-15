var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var passport = require('passport');
var session = require('express-session');

// secret, clientID
var keys = require('./bin/config');

// use OAuth2
var OAuth2Strategy = require('passport-oauth2').Strategy;

var index = require('./routes/index');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// express-session
app.use(session({ secret: 'session-secret' }));

app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// STEP 3: callback redirect
app.get('/', passport.authenticate('oauth2', { failureRedirect: '/error' }),
    function(req, res)
    {
        res.redirect('/index.html');
    });


app.use(express.static(path.join(__dirname, 'public')));

var page = {index: "index.html"};
app.use('/', express.static('app', page));


// ===========================

// STEP 2: OAuth2 strategy
passport.use(new OAuth2Strategy({
        authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
        tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
        clientID: keys.clientID,
        clientSecret: keys.secret,
        callbackURL: "http://localhost:3000",
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done)
    {
        // write accessToken into the session
        req.session.accessToken = accessToken;
        console.log(' ---> write accessToken to session');
        // establish authenticated session
        req.session.authed = true;
        console.log(' ---> write auth to session');
        // send an empty profile
        return done(null,profile);
    }
));


passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user);
});


// STEP 1: start authentication
app.get('/auth', passport.authenticate('oauth2'));


// STEP 4: get profile info with the token from session
app.get('/profile',function(req, res, next){

    var util = require('util');
    var exec = require('child_process').exec;

    var command = `curl -X GET -H "Authorization: Bearer ${req.session.accessToken}" -H "Cache-Control: no-cache" "https://staging-auth.wallstreetdocs.com/oauth/userinfo"`;

    child = exec(command, function(error, stdout, stderr){

        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);

        if(error !== null)
        {
            console.log('exec error: ' + error);
        }
        // send profile info
        var response = {};
        if (req.session.authed === true) response = { data: stdout, auth: req.session.authed };
        if (req.session.authed === false) response = { data: 'Unauthorized', auth: req.session.authed };
        res.send(response);
    });
});


// logout
app.get('/logout', function(req, res){
    req.logout();
    req.session.authed = false;
    res.redirect('/');
});

// =============================
console.log(' ---> loaded');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
