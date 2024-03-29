const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friend_controller');

router.post('/add/:id' , friendshipController.addFriend);     

module.exports = router;

