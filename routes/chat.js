const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/chatMessage');
const chatController = require('../controllers/chatController');

router.post('/messages', chatController.createMessage);

router.get('/chat/messages', async (req, res) => {
    try {
        // Logic to fetch chat messages from the database
        // Example using Mongoose:
        const messages = await ChatMessage.find({ chatroom: 'codeial' }); // Adjust query as needed
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

module.exports = router;