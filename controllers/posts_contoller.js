const Post = require('../models/post');
const Comment = require('../models/comment');

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
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        req.flash('success' , 'Post published!')
        return res.redirect('back');
    }
    catch(err){
        req.flash('error' , err);
        return;
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
            await post.deleteOne();


            // Remove comments associated with the post
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success' , 'Post and assocoated comments deleted!')
            return res.redirect('back');
        } else {
            req.flash('error' , 'You cannot delete this post!')
            return res.status(403).send("Unauthorized");
        }
    } catch (err) {

        req.flash('error' , err)
        return res.status(500).send("Internal Server Error");
    }
};