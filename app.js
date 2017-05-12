var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');

var index = require('./routes/index');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/login', login);

// ===========================

app.get('/logout', function(req, res){
    req.logout();
    res.send('server@logout > RESPONSE');
});

var keys = require('./bin/config');
var OAuth2Strategy = require('passport-oauth2').Strategy;

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
        tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
        clientID: keys.clientID,
        clientSecret: keys.secret,
        callbackURL: "http://localhost:3000/"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

var session = require('express-session');
app.use(session({secret: "customz"}));
app.use(passport.initialize());
app.use(passport.session());

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


// we will call this to start the GitHub Login process
app.get('/auth', passport.authenticate('oauth2'));

// GitHub will call this URL
app.get('/auth/callback', passport.authenticate('oauth2', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    }
);

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
