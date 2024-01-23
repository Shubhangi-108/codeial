const Post = require( '../models/post');

module.exports.home = async function(req , res){
    // console.log(req.cookies);
    try {
        // Use async/await to handle asynchronous operation
        const posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec();

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts
        });
    } catch (err) {
        console.error('Error in fetching posts:', err);
        return res.redirect('back');
    }

}