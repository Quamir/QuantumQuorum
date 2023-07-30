const catchAsync = require('../utils/catchAsync');
const Friends = require('../models/friendsModel');

exports.addFriend = catchAsync(async (req,res,next) => {
    const friends = new Friends(...[
        ,
        req.body.userId,
        req.body.userId2
    ]);
    const addFriend = await friends.addFriend();

    res.status(200).json({
        message: addFriend
    });
});

exports.showAllFriends = catchAsync(async (req,res,next) => {
    const friends = new Friends(...[,req.body.userId]);
    const showAllFriends = await friends.showAllFriends();

    res.status(200).json({
        message: showAllFriends
    });
});