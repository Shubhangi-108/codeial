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
module.exports.create = function(req , res){
    //TODO later
}

// sign in and create a session for the user
module.exports.createSession = function(req , res){
    //TODO later
}