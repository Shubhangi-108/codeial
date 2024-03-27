const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// module.exports.create = function( req , res ){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     })
//     .then(post => {
//         console.log('Post created successfully:', post);
//         return res.redirect('back');
//     })
//     .catch(err => {
//         console.error('Error in creating a post:', err);
//         return res.redirect('back');
//     });
// }

module.exports.create = async function( req , res ){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        // if( req.xhr ){
        //     // post = await post.populate('user', 'name').execPopulate();
        //     return res.status(200).json({
        //         data:{
        //             post: post
        //         },
        //         message: "Post created!!"
        //     })
        // }

        req.flash('success' , 'Post published!')
        return res.redirect('back');
    }
    catch(err){
        req.flash('error' , err);
        return res.redirect('back');
    }
}

// module.exports.destroy = async function (req, res) {
//     try {
//         const post = await Post.findById(req.params.id);

//         if (!post) {
//             return res.status(404).send("Post not found");
//         }

//         // Check if the user is the owner of the post
//         if (post.user == req.user.id) {
//             await post.deleteOne();

//             // Remove comments associated with the post
//             await Comment.deleteMany({ post: req.params.id });

//             return res.redirect('back');
//         } else {
//             return res.status(403).send("Unauthorized");
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send("Internal Server Error");
//     }
// };

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Check if the user is the owner of the post
        if (post.user == req.user.id) {


            await Like.deleteMany({likeable: post , onModel:'Post'});
            await Like.deleteMany({_id: {$in:post.comments}});

            await post.deleteOne();


            // Remove comments associated with the post
            await Comment.deleteMany({ post: req.params.id });

            // if( req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         }, 
            //         message: 'Post deleted'
            //     })
            // }

            req.flash('success' , 'Post and assocoated comments deleted!')
            return res.redirect('back');
        } else {
            req.flash('error' , 'You cannot delete this post!')
            return res.status(403).send("Unauthorized");
        }
    } catch (err) {

        req.flash('error' , err)
        return res.redirect('back');
    }
};