const Comment = require('../models/comment');
const Post = require('../models/post');

// module.exports.create = async function (req, res) {
//     try {
//         const post = await Post.findById(req.body.post);

//         if (!post) {
//             console.error('Post not found');
//             return res.redirect('back');
//         }

//         const comment = await Comment.create({
//             content: req.body.content,
//             post: req.body.post,
//             user: req.body._id
//         });

//         post.comments.push(comment);
//         await post.save();

//         return res.redirect('/');
//     } catch (err) {
//         console.error('Error in creating or saving the comment:', err);
//         return res.redirect('back');
//     }
// };

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
                user: req.body._id
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
            })
            .catch(commentError => {
                console.error('Error in creating comment:', commentError);
                return res.redirect('back');
            });
        })
        .catch(findError => {
            console.error('Error in finding post:', findError);
            return res.redirect('back');
        });
};