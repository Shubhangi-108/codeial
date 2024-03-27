const Like = require('../models/like');
const Comment  = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function( req , res){
    try{
        //likes/toggle/?id=absxyz123&type=Post
        let likeable;
        let deleted = false;

        console.log('shubhi' ,req.query);

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes')
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes')
        }

        //check is like alredy exists
        let existingLikes = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        //delete existind like or make new one if does not exist
        if( existingLikes){
            likeable.likes.pull(existingLikes._id);
            likeable.save();
            await existingLikes.deleteOne();
            console.log('like exists')

            deleted = true;

        }else{
            let newLike = await Like.create({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });
            likeable.likes.push(newLike._id);
            likeable.save();
            console.log('like does not exists')

            // deleted = false;
        }

        return res.json(200 , {
            message: "Request successfull",
            data: {
                deleted: deleted
            }
        })

    }
    catch(err){
        console.log(err);
        return res.json(500 , {
            message: 'Internal Server Error'
        });
    }
}