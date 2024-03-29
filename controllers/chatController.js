// controllers/chatController.js
const ChatMessage = require('../models/chatMessage');

// Create a new chat message
exports.createMessage = async (req, res) => {
    try {
        const newMessage = await ChatMessage.create(req.body);
        console.log('newmessage:' , newMessage , 'req.body:' , req.body);
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};