const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user')


// passport.use ( new googleStrategy({
//         clientID : "873027590229-lnf6ana4a0g0moh9mqs74d8hvmh7a4qj.apps.googleusercontent.com",
//         clientSecret: "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",
//         callbackURL: "http://localhost:8000/users/auth/google/callback"
//     },

//     function(accessToken , refreshToken , profile , done){
//         //find user
//         User.findOne({email: profile.emails[0].value}).exec(function(err , user){
//             if(err){console.log('ERROR in google strategy passport' , err); return;}
//             console.log(profile);
//             if(user){
//                 //if found , set this user as req.user
//                 return done( null , user);
//             }else{

//                 //if not found , create the user and set it as req.user or sign in the user
//                 User.create({
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     password: crypto.randomBytes(20).toString('hex')
//                 }, function(err , user){
//                     if(err){console.log('error in creating user' , err) ; return;}
//                     return done(null , user);
//                 })
//             }
//         })
//     }
// ))

// //tell passpost to  use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "873027590229-lnf6ana4a0g0moh9mqs74d8hvmh7a4qj.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Find user
        let user = await User.findOne({ email: profile.emails[0].value }).exec();
        console.log(profile);
        if (user) {
            // If found, set this user as req.user
            return done(null, user);
        } else {
            // If not found, create the user and set it as req.user or sign in the user
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            return done(null, user);
        }
    } catch (err) {
        console.log('Error in Google strategy passport', err);
        return done(err);
    }
}));


module.exports = passport;