const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');


//READ
router.get('/getuserdata', userController.getUserData);
router.get('/getfriendslist', userController.getFriendsList);
router.get('/getfriendswithreals', userController.getFriendsWithReals);
router.get('/getuserreals', userController.getUserReals);
router.get('/getuserpost', userController.getUserPost);
router.get('/getuserbio', userController.getUserBio);
router.get('/getusermedia', userController.getUserMedia);

//CREATE
router.post(
    '/signup', 
    userController.uploadProfilePicture,
    userController.createAccount
);

//UPDATE
router.patch('/updatefirstname', userController.updateFirstName);
router.patch('/updatelastname', userController.updateLastName);
router.patch('/updateemail', userController.updateEmail);
router.patch('/updatebio', userController.updateBio);
router.patch('/updatepassword', userController.updatePassword);
router.patch(
    '/updateprofilepicture', 
    userController.uploadProfilePicture, 
    userController.updateProfilePicture
    );

//DELETE


module.exports = router;