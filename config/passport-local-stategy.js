const passpost = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication nusing passport
passpost.use(new LocalStrategy({
        usernameField: 'email'  
    },
    function(email , password, done){
        //find the user and establish the identity
        User.findOne({email: email} , function(err , user){
            if(err){return done(err);}
            if(!user || user.password!= password){
                console.log('invalid Username/Password')
                return done(null , false);
            }

            return done( null , user);
        });
    }
));

//serializing the user to decide which key is  to kept in the cookies
passpost.serializeUser(function(user , done){
    done(null , user.id)
});
//deserializing the user form the key in th cookie
passpost.deserializeUser(function(user , done){
    User.findById(Id , function(ree , user){
        if(err){
            console.log('Error in finding user---> passpost')
        }
        return done( null , user);
    });
});

module.exports = passpost;
