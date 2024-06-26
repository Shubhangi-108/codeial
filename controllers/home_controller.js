const Post = require( '../models/post');
const User = require('../models/user');
const ChatMessage = require('../models/chatMessage');


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
        .populate({
            path: 'comments',
            populate: {
                path: 'likes' // Populate likes for each comment
            }
        })
        .populate('likes'); //populate likes for post
    
        // console.log(posts)

        const users = await User.find({})
        // const userId = req.user.id;
        const chatMessages = await ChatMessage.find({});
        console.log('1' , chatMessages);
            
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users : users,
            chatMessages : chatMessages
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