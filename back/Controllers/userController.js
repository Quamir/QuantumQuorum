const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Media = require('../models/mediaModel');

const media = new Media('./public/profile_pictures');
const upolad = media.uploadProfilePicture();


exports.uploadProfilePicture = upolad.single('image');


exports.createAccount = catchAsync(async (req,res,next) => {
    const user = new User(
        req.body.firstName,
        req.body.lastName,
        req.body.email, 
        req.body.password,
        `${req.protocol}://${req.get('host')}/public/profile_pictures/${req.file.filename}`,
        req.body.bio,
        req.body.github,
        req.body.linkedin,
        req.body.school
    );

    const createUser = await user.createAccount();

    res.status(200).json({
        message: createUser
    });
});

exports.getUserData = catchAsync(async (req,res,next) => {
    const user = new User(...[, , , , , , , , ,req.body.id]);
    const getData = await user.getUserData();

    res.status(200).json({
        message: getData
    });
});

exports.getFriendsList = catchAsync(async (req,res,next) => {
    const user = new User(...[, , , , , , , , ,req.body.id]);
    const friendsList = await user.getFriendsList();

    res.status(200).json({
        message: friendsList
    });
});

exports.getFriendsWithReals = catchAsync(async (req,res,next) => {
    const user = new User(...[, , , , , , , , ,req.body.id]);
    const friendsRealList = await user.getFriendsWithReals();

    res.status(200).json({
        message: friendsRealList
    });
});

exports.getUserReals = catchAsync(async (req,res,next) => {
    const user = new User(...[, , , , , , , , ,req.body.id]);
    const userReals = await user.getUserReals();

    res.status(200).json({
        message: userReals
    });
});

exports.getUserPost = catchAsync(async (req,res,next) => {
    const user = new User(...[, , , , , , , , ,req.body.id]);
    const userPost = await user.getUserPost();

    res.status(200).json({
        message: userPost
    });
});

exports.getUserBio = catchAsync(async (req,res,next) => {
    const user = new User(...[, , , , , , , , ,req.body.id]);
    const userBio = await user.getUserBio();

    res.status(200).json({
        message: userBio
    });
});

exports.getUserMedia = catchAsync(async (req,res,next) => {
    const user = new User(...[, , , , , , , , ,req.body.id]);
    const userMedia = await user.getUserMedia();

    res.status(200).json({
        message: userMedia
    });
});

exports.updateProfilePicture = catchAsync(async (req,res,next) => {
    const user = new User(
        ...[
            , 
            , 
            , 
            ,
            `${req.protocol}://${req.get('host')}/public/profile_pictures/${req.file.filename}`, 
            , 
            , 
            , 
            ,
            req.body.id
        ]);
    const profilePicture = await user.updateProfilePicture();

    res.status(200).json({
        message: profilePicture
    });
});

exports.updateFirstName = catchAsync(async (req,res,next) => {
    const user = new User(...[req.body.firstName, , , , , , , , , req.body.id]);
    const updateName = await user.updateFirstName();

    res.status(200).json({
        message: updateName
    });
});

exports.updateLastName = catchAsync(async (req,res,next) => {
    const user = new User(...[,req.body.lastName , , , , , , , , req.body.id]);
    const updateName = await user.updateLastName();

    res.status(200).json({
        message: updateName
    });
});

exports.updateEmail = catchAsync(async (req,res,next) => {
    const user = new User(...[, ,req.body.email , , , , , , , req.body.id]);
    const updateEmail = await user.updateEmail();

    res.status(200).json({
        message: updateEmail
    });
}); 

exports.updateBio = catchAsync(async (req,res,next) => {
    const user = new User(...[, , , , ,req.body.bio , , , , req.body.id]);
    const updateBio = await user.updateBio();

    res.status(200).json({
        message: updateBio
    });
});

exports.updatePassword = catchAsync(async (req,res,next) => {
    const user = new User(...[, ,req.body.email, , , , , , , , req.body.newPassword]);
    const updatedPassword = await user.updatePassword();

    res.status(200).json({
        message: updatedPassword
    });
});

