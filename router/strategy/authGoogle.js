var config=require('../../config/authConfig');
module.exports=function(passport,authRouter){
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });



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
};