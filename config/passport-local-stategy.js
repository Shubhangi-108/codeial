const passpost = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication nusing passport
passpost.use(new LocalStrategy({
        usernameField: 'email'  
    },
    function(email , password, done){
        //find the user and establish the identity
        User.findOne({email: email})
        .then(user => {
            if(!user || user.password!= password){
                console.log('invalid Username/Password')
                return done(null , false);
            }

        return done( null , user);
        })
        .catch(err => {
            console.error(err);
            return done(err);
        });
    }
));

//serializing the user to decide which key is  to kept in the cookies
passpost.serializeUser(function(user , done){
    done(null , user.id)
});

//deserializing the user form the key in th cookie
passpost.deserializeUser(function(id , done){
    User.findById(id)
        .then(user => {
            if (!user) {
                console.log('Error in finding user ---> passport');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.error(err);
            return done(err);
        });
});

//check if the user is authenticated
passpost.checkAuthentication = function(req , res , next){
    //if user is signed in htne passed on the request to the next funtion(contollers action)
    if( req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passpost.setAuthenticatedUser = function(req , res , next){
    if( req.isAuthenticated()){
        //req.user contain the current signed user from the session cookiw and we are just senfding this to local for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passpost;
