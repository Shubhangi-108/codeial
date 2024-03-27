const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likes_contoller')

router.post('/toggle' , likeController.toggleLike);

module.exports = router;