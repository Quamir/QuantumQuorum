const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/commentModel');


exports.showAllComments = catchAsync(async (req,res,next) => {
    const comment = new Comment(...[,req.body.postId]);
    const showAllComments = await comment.showAllComments();

    res.status(200).json({
        message: showAllComments
    });
});

exports.createComment = catchAsync(async (req,res,next) => {
    const comment = new Comment(...[
        ,
        req.body.postId,
        req.body.userId,
        req.body.text
    ]);
    const createComment = await comment.createComment();

    res.status(200).json({
        messsage: createComment
    });
});

exports.updateComment = catchAsync(async (req,res,next) => {
    const comment = new Comment(...[
        req.body.id,
        ,
        req.body.userId,
        req.body.text
    ]);
    const updateComment = await comment.updateComment();

    res.status(200).json({
        message: updateComment
    });
});

exports.deleteComment = catchAsync(async (req,res,next) => {
    const comment = new Comment(...[
        req.body.id, 
        ,
        req.body.userId
    ]);
    const deleteComment = await comment.deleteComment();

    res.status(200).json({
        message: deleteComment
    }); 
});