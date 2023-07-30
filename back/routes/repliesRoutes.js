const express = require('express');
const router = express.Router();
const repliesController = require('../Controllers/repliesController');

// READ
router.get('/showallreplies', repliesController.showAllReplies);
//CREATE
router.post('/createreply', repliesController.createReply);
//UPDATE
router.patch('/updatereply', repliesController.updateReply);
//DELETE
router.delete('/deletereply', repliesController.deleteReply);

module.exports = router;