const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
    },

    //this defines the object id of a liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel' //which other property does this belongs
    },
    //this is used to defining the tyoe of the liked object since this is a dynamic refernce
    onModel: {
        type: String,
        required : true,
        enum: ['Post' , 'Comment']
    }
},{
    timestamps: true,
})

const Like = mongoose.model('Like' , likeSchema)
module.exports = Like