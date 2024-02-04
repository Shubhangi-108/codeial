const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.render('user_profile', {
            title: "User profile",
            profile_user: user
        });
    } catch (err) {
        console.error('Error in fetching user profile:', err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports.update = async function(req, res) {
    try {
        if (req.user.id == req.params.id) {
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
            User.uploadedAvatar( req , res , function(err){
                if(err){console.log('*****Multer error' , err)}

                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname , '..' , user.avatar));
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            });

            if (!user) {
                return res.status(404).send("User not found");
            }

            // return re s.redirect('back');
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.error('Error in updating user profile:', err);
        return res.status(500).send("Internal Server Error");
    }
};

//render the sign up part
module.exports.signUp = function(req ,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signup' , {
        title: "Codeial|Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req ,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    req.flash('success' , 'Logged in Successfully');
    return res.redirect('/');
}


module.exports.distroySession = function(req , res){

    req.logout((err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        req.flash('success' , 'Logged out Successfully')
        // Redirect or respond after logout
        res.redirect('/'); // You can redirect to a different page or send a response
    });
}