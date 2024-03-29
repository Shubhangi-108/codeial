const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

router.get('/' , homeController.home);
router.use('/users' , require('./user'))
router.use('/posts' , require('./posts'));
router.use('/comments' , require('./comments'));
router.use('/likes' , require('./likes'));
router.use('/friends' , require('./friends'));
router.use('/chat' , require('./chat'));

router.use('/api' , require('./api'));

module.exports = router;