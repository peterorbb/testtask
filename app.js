var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');


var passport = require('passport');
require('./bin/passport');
var session = require('express-session');

// secret, clientID

// use OAuth2
var OAuth2Strategy = require('passport-oauth2').Strategy;

var app = express();


// express-session
app.use(session({ secret: 'session-secret' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', function (req, res, next) {

    //if it's callback from oauth, then we continue auth process and then redirect to index.html
        if (req.query.code) {
         return    passport.authenticate('oauth2', {failureRedirect: '/error'})(req, res, function(){
             res.cookie('isAuthenticated',true);
             req.query.code = undefined;
             res.redirect('/')
         })
        }
        next()
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/auth', passport.authenticate('oauth2'));

app.get('/profile',function(req, res, next){
    var util = require('util');
    var exec = require('child_process').exec;

    var command = `curl -X GET -H "Authorization: Bearer ${req.session.accessToken}" -H "Cache-Control: no-cache" "https://staging-auth.wallstreetdocs.com/oauth/userinfo"`;

    child = exec(command, function(error, stdout, stderr){

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

app.get('/logout', function(req, res){
    req.session.destroy();
    res.sendStatus(200);
});

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

  res.status(err.status || 500);
  res.send({'message':err.message});
});

module.exports = app;
