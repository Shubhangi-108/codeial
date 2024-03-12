const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts , function(jwtPayload , done){
    User.findById(jwtPayload._id)
    .then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        return done(err, false);
    });
}));

module.exports = passport;