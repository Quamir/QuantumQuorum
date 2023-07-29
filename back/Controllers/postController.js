const catchAsync = require('../utils/catchAsync');
const Post = require('../models/postModel');
const Media = require('../models/mediaModel');

const media = new Media('./public/post_pictures');
const upload = media.uploadMedia();

exports.uploadPostMedia = upload.single('image');


exports.showAllPost = catchAsync(async (req,res,next) => {
    const post = new Post();
    const showAllpost = await post.showAllPost();

    res.status(200).json({
        message: showAllpost
    });
});

exports.showSinglePost = catchAsync(async (req,res,next) => {
    const post = new Post(req.body.id);
    const showSinglePost = await post.showSinglePost();

    res.status(200).json({
        message: showSinglePost
    });
});

exports.showProfilePosts = catchAsync(async (req,res,next) => {
    const post = new Post(...[,req.body.userId]);
    const showProfilePosts = await post.showProfilePosts();

    res.status(200).json({
        message: showProfilePosts
    });
});

exports.createPost = catchAsync(async (req,res,next) => {
    const post = new Post(
    ...[
        ,
        req.body.userId,
        `${req.protocol}://${req.get('host')}/public/post_pictures/${req.file.filename}`,
        req.body.text,
    ]);
    const createPost = await post.createPost();

    res.status(200).json({
        message: createPost
    });
});

exports.updateMedia = catchAsync(async (req,res,next) => {
    const post = new Post(...[
        req.body.id,
        ,
        `${req.protocol}://${req.get('host')}/public/post_pictures/${req.file.filename}`
    ]);
    const updateMedia = await post.updateMedia();

    res.status(200).json({
        message: updateMedia
    });
});

exports.updateText = catchAsync(async (req,res,next) => {
    const post = new Post(...[
        req.body.id,
        ,
        ,
        req.body.text
    ]);
    const updateText = await post.updateText();

    res.status(200).json({
        message: updateText
    });
});

exports.deletePost = catchAsync(async (req,res,next) => {
    const post = new Post(req.body.id);
    const deletePost = await post.deletePost();

    res.status(200).json({
        message: deletePost
    });
});