const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req , res){


    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec();

    return res.json(200 , {
        message: 'List of post', 
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);


        if( post.user == req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post : req.param.id});

            return res.json(200 , {
                message: 'Post and associated comments deleted successfully'
            })
        }
        else{
            return res.json(401 , {
                message : "You cannot delete this post"
            })
        }
        // if (!post) {
        //     return res.status(404).send("Post not found");
        // }

        // // Check if the user is the owner of the post
        // // if (post.user == req.user.id) {
        //     await post.deleteOne();


        //     // Remove comments associated with the post
        //     await Comment.deleteMany({ post: req.params.id });

        //     return res.json(200 , {
        //         message: 'Post and associated comment deletes successfully!'
        //     });

        // // } else {
        // //     req.flash('error' , 'You cannot delete this post!')
        // //     return res.status(403).send("Unauthorized");
        // // }
    } catch (err) {

        console.log(err);
        // req.flash('error' , err)
        return res.json(500 , {
            message: 'Internal Server Error'
        });
    }
};