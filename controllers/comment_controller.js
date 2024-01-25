const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (!post) {
                console.error('Post not found');
                return res.redirect('back');
            }

            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            
            .then(comment => {
                post.comments.push(comment);
                post.save()
                    .then(() => {
                        return res.redirect('/');
                    })
                    .catch(saveError => {
                        console.error('Error in saving post:', saveError);
                        return res.redirect('back');
                    });
                    req.flash('success' , 'comment Published')
            })
            
            .catch(commentError => {
                console.error('Error in creating comment:', commentError);
                req.flash('error' , 'Error in creating comment');
                return res.redirect('back');
            });
        })
        .catch(findError => {
            console.error('Error in finding post:', findError);
            req.flash('error' , findError)
            return res.redirect('back');
        });
};

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

module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        // Check if the user is the owner of the comment
        if (comment.user.toString() === req.user.id.toString()) {
            const postId = comment.post;

            await comment.deleteOne();

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('success' , 'Comment deleted successfully');
            return res.redirect('back');
        } else {
            return res.status(403).send("Unauthorized");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};