const catchAsync = require('../utils/catchAsync');
const Reply = require('../models/repliesModel');

exports.showAllReplies = catchAsync(async (req,res,next) => {
    const replies = new Reply(...[,req.body.commentId]);
    const showAllReplies =  await replies.showAllReplies();

    res.status(200).json({
        message: showAllReplies
    });
});

exports.createReply = catchAsync(async (req,res,next) => {
    const replies = new Reply(...[
        , 
        req.body.commentId,
        req.body.userId,
        req.body.text
    ]);
    const createReply = await replies.createReply();

    res.status(200).json({
        message: createReply
    });
});

exports.updateReply = catchAsync(async (req,res,next) => {
    const replies = new Reply(...[
        req.body.id,
        ,
        req.body.userId,
        req.body.text
    ]);
    const updateReply = await replies.updateReply();

    res.status(200).json({
        messsage: updateReply
    });
});

exports.deleteReply = catchAsync(async (req,res,next) => {
    const replies = new Reply(...[
        req.body.id,
        ,
        req.body.userId
    ]);
    const deleteReply = await replies.deleteReply();

    res.status(200).json({
        message: deleteReply
    });
});