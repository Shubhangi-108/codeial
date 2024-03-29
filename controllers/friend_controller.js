const Friendship = require('../models/friends');

module.exports.addFriend = async function(req, res) {
    try {
        let friendship = await Friendship.create({
            from_user: req.user._id,
            to_user: req.params.id
        });
        return res.json(200, {
            message: "Friendship created!"
        });
    } catch (err) {
        console.log('Error', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}