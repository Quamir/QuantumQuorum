const catchAsync = require('../utils/catchAsync');
const Likes = require('../models/likesModel');


exports.likePost = catchAsync(async (req,res,next) => {
    const like = new Likes(...[
        ,
        req.body.postId,
        req.body.userId
    ]);
    const likePost = await like.likePost();

    res.status(200).json({
        message: likePost
    });
});

exports.likeComment = catchAsync(async (req,res,next) => {
    const like = new Likes(...[
        ,
        req.body.postId, 
        req.body.userId
    ]);
    const likeComment = await like.likeComment();

    res.status(200).json({
        message: likeComment
    });
});