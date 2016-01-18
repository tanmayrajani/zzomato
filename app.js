var express=require("express");
var app=express();
var auth = require('./router/auth');
var logger = require('morgan')
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , session = require('express-session')
    , methodOverride = require('method-override');

var path = require('path');
var passport = require('passport')
    , util = require('util')

    , session = require('express-session');
//mongoDB
var dbConfig=require('./config/dbConfig');
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =dbConfig.dburl;
// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.createConnection(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(logger());
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


authRouter=require('./router/auth')(passport);
app.use('/auth',authRouter);
app.listen(3000);