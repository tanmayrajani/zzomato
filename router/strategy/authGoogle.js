var User=require('../../models/user');
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
            //console.log(req.user)

            googleuser = new User();
            console.log(req.user._json.emails[0].value)
            User.find({'email':req.user._json.emails[0].value},function(err,user){
                if(err)
                {
                    res.status(500).send(err);
                }
                if(user)
                {
                    res.send('User account already exists');
                }
                else
                {
                    googleuser.google.email=req.user._json.emails[0].value;
                    googleuser.google.id=req.user._json.id;
                    googleuser.google.name=req.user._json.displayName;
                    googleuser.google.photoUrl=req.user._json.image.url;
                    googleuser.save(function(err){
                        if(err){
                            res.status(500).send(err);
                        }
                        else
                        {
                            res.send("User account added");
                        }
                    })
                }
            })
            //res.json(req.user);
        });
};