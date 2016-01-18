var config=require('../../config/authConfig');
module.exports=function(passport,authRouter){
    var FacebookStrategy = require('passport-facebook').Strategy;
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
};