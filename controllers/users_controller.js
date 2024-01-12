const User = require('../models/user');

module.exports.profile = function(req , res){
    return res.render('user' , {
        title: "profile"
    })
}

//render the sign up part
module.exports.signUp = function(req ,res){
    return res.render('user_signup' , {
        title: "Codeial|Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req ,res){
    return res.render('user_signin' , {
        title: "Codeial|Sign In"
    })
}

//get the sign up data


module.exports.create = async function(req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.redirect('back');
        }

        const newUser = await User.create(req.body);
        return res.redirect('/users/sign-in');
    } catch (error) {
        console.error('Error in user creation:', error);
        return res.redirect('back');
    }
};


// sign in and create a session for the user
module.exports.createSession = function(req , res){
    //TODO later
}