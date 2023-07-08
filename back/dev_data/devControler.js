const catchAsync = require('../utils/catchAsync');
const ComGenCon = require('../dev_data/comGenCon');

exports.genInitialUsers = catchAsync(async (req, res, next) => {
  const comGenCOn = new ComGenCon();
  const genInitialUsers = await comGenCOn.genUser();

  res.status(200).json({
    message: genInitialUsers,
  });
});

exports.genPost = catchAsync(async (req, res, next) => {
  const comGenCOn = new ComGenCon();
  const genPost = await comGenCOn.genPost();

  res.status(200).json({
    message: genPost,
  });
});

exports.genReals = catchAsync(async (req, res, next) => {
  const comGenCOn = new ComGenCon();
  const genReals = await comGenCOn.genReals();

  res.status(200).json({
    message: genReals,
  });
});

exports.genPostLikes = catchAsync(async (req, res, next) => {
  const comGenCOn = new ComGenCon();
  const genPostLikes = await comGenCOn.genPostLikes();

  res.status(200).json({
    message: genPostLikes,
  });
});

exports.genPostComments = catchAsync(async (req, res, next) => {
  const comGenCOn = new ComGenCon();
  const genPostComments = await comGenCOn.genPostComments();

  res.status(200).json({
    message: genPostComments,
  });
});

exports.genCommentLikes = catchAsync(async (req, res, next) => {
  const comGenCOn = new ComGenCon();
  const commentLikes = await comGenCOn.genCommentLikes();

  res.status(200).json({
    message: commentLikes,
  });
});

exports.genReplies = catchAsync(async (req, res, next) => {
  const comGenCOn = new ComGenCon();
  const replies = await comGenCOn.genReplies();

  res.status(200).json({
    message: replies,
  });
});

exports.getBacon = catchAsync(async (req, res, next) => {
  const comGenCon = new ComGenCon();
  const getLorem = await comGenCon.getLoremBacon();

  res.status(200).json({
    message: getLorem,
  });
});

exports.genInitialFrindRelations = catchAsync(async (req, res, next) => {
  const comGenCOn = new ComGenCon();
  const relations = await comGenCOn.genInitialFriendRelations();

  res.status(200).json({ 
    message: relations 
    });
});
