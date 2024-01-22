const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_contoller');

router.post('/create' , postController.create);

module.exports = router;