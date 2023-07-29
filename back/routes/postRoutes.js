const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');


//READ
router.get('/allpost', postController.showAllPost);
router.get('/singlepost', postController.showSinglePost);
router.get('/profileposts', postController.showProfilePosts);

//CREATE
router.post(
    '/createpost', 
    postController.uploadPostMedia,
    postController.createPost
);

//UPDATE 
router.patch(
    '/updatemedia',
    postController.uploadPostMedia, 
    postController.updateMedia
);
router.patch('/updateposttext', postController.updateText);

//DELETE
router.delete('/deletepost', postController.deletePost);


module.exports = router;