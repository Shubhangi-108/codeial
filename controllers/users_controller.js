const User = require('../models/user');

module.exports.profile = async function(req , res){

    try{
        if(req.cookies.user_id){
            const user = await User.findById(req.cookies.user_id);
            if(user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }
            return res.redirect('/users/sign-in')
        }
        else{
            return res.redirect('/users/sign-in')
        }
    }
    catch (error) {
        console.error('Error in fetching user profile:', error);
        return res.redirect('/users/sign-in');
    }
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
module.exports.createSession = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || user.password !== req.body.password) {
            // User not found or incorrect password
            return res.redirect('back');
        }

        // Set up session and redirect to profile
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    } 
    catch (error) {
        console.error('Error in creating session:', error);
        return res.redirect('back');
    }
};