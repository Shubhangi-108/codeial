const Post = require( '../models/post');
const User = require('../models/user');

// console.log('hello1');

module.exports.home = async function(req , res){
    // console.log(req.cookies);
    try {
        // Use async/await to handle asynchronous operation
        const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec();

        const users = await User.find({})
            
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users : users
        });
        
    } catch (err) {
        console.error('Error in fetching posts:', err);
        return res.redirect('back');
    }

}

// module.exports.home = async function(req , res){

//     try{
//         let posts = await Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         });
        
//         let users = await User.find({});
//         return res.render('home', {
//             title: 'Codeial | Home',
//             posts: posts,
//             all_users : users
//         });
//     }
//     catch(err){
//         console.log('Error' , err);
//         return;
//     }

// }