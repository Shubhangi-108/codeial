const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comment_mailer');
const Like = require('../models/like');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            // comment = await comment.populate('user', 'name').execPopulate();
            // commentsMailer.newComment(comment);

            // if(req.xhr){
            //     // Similar for comments to fetch the user's id!
            //     comment = await comment.populate('user', 'name').execPopulate();
    
            //     return res.status(200).json({
            //         data: {
            //             comment: comment
            //         },
            //         message: "Post created!"
            //     });
            // }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res) {
    try {
        // console.log('hello1');

        const comment = await Comment.findById(req.params.id);
        console.log(req.params.id);


        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const postId = comment.post;

        await comment.deleteOne();

        Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id}});

        await Like.deleteMany({likeable: comment._id , onModel: 'Comment'});

        // if (req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             comment_id: req.params.id
        //         },
        //         message: "Comment deleted"
        //     });
        // }

        req.flash('success', 'Comment deleted!');
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Internal Server Error');
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

