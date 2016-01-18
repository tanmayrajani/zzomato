var express=require("express");
var app=express()
var http=require("http");
var User = require('../models/user');
var request = require('request');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase');
var config=require('../config/authConfig');
var authRouter = express.Router();

var routes=function(passport){

    var fbAuth=require('./strategy/authFacebook')(passport,authRouter);
    var googleAuth=require('./strategy/authGoogle')(passport,authRouter);


    authRouter.get('/', function(req, res){
        res.render('index', { user: req.user });
    });

    authRouter.get('/account', ensureAuthenticated, function(req, res){
        res.render('account', { user: req.user });
    });

    authRouter.get('/login', function(req, res){
        res.render('login', { user: req.user });
    });

    authRouter.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });


    return authRouter;
}
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}
module.exports = routes;