const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const friendshipSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Friendship = mongoose.model('Friends', friendshipSchema);

module.exports = Friendship;

