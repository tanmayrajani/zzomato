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

    var FacebookStrategy = require('passport-facebook').Strategy
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    passport.serializeUser(function(user, done) {
            done(null, user);
        });

    passport.deserializeUser(function(obj, done) {
            done(null, obj);
        });

   passport.use(new FacebookStrategy({
                clientID: config.facebookAuth.clientid,
                clientSecret: config.facebookAuth.clientSecreat,
                callbackURL: config.facebookAuth.callbackUrl,
                profileFields: ['id', 'displayName', 'photos','gender','locale']
            },
            function(accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {
                return done(null, profile);
            });
        }
    ));

    passport.use(new GoogleStrategy({
            clientID:config.googleAuth.clientid,
            clientSecret:config.googleAuth.clientSecreat,
            callbackURL: config.googleAuth.callbackUrl
        },
        function(accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                return done(null, profile);
            });
        }
    ));

    authRouter.get('/', function(req, res){
        res.render('index', { user: req.user });
    });

    authRouter.get('/account', ensureAuthenticated, function(req, res){
        res.render('account', { user: req.user });
    });

    authRouter.get('/login', function(req, res){
        res.render('login', { user: req.user });
    });
    authRouter.get('/facebook',
        passport.authenticate('facebook'),
        function(req, res){
            // The request will be redirected to Facebook for authentication, so this
            // function will not be called.
        });
    authRouter.get('/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            console.log(req.user)
            res.json(req.user);
        });
    authRouter.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
    authRouter.get('/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'
        ,'https://www.googleapis.com/auth/plus.me'] }),
        function(req, res){
            // The request will be redirected to Google for authentication, so this
            // function will not be called.
        });
    authRouter.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            console.log(req.user)
            res.json(req.user);
        });
    return authRouter;
}
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}
module.exports = routes;