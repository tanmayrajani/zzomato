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
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


authRouter=require('./router/auth')(passport);
app.use('/auth',authRouter);
app.listen(3000);