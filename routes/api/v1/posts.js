const express = require('express');
const router = express.Router();
const password = require('passport');
const postsApi = require('../../../controllers/api/v1/posts_api')

router.get('/' , postsApi.index);
router.delete('/:id' , password.authenticate('jwt' , {session : false}), postsApi.destroy);

module.exports = router;