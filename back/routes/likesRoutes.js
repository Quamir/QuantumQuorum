const express = require('express');
const router = express.Router();
const likesController = require('../Controllers/likesController');

router.post('/likepost', likesController.likePost);
router.post('/likecomment', likesController.likeComment);

module.exports = router;