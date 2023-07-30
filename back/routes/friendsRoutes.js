const express = require('express');
const router = express.Router();
const friendsController = require('../Controllers/friendsController');

router.get('/showallfriends', friendsController.showAllFriends);
router.post('/addfriend', friendsController.addFriend);

module.exports = router;