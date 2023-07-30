const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/commentController');

//READ
router.get('/showallcomments', commentController.showAllComments);
//CREATE
router.post('/createcomment', commentController.createComment);
//UPDATE
router.patch('/updatecomment', commentController.updateComment);
//DELETE
router.delete('/deletecomment', commentController.deleteComment);

module.exports = router;