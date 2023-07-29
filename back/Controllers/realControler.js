const catchAsync = require('../utils/catchAsync');
const Real = require('../models/realModel');
const Media = require('../models/mediaModel');

const media = new Media('./public/reals');
const upload = media.uploadMedia();

exports.uploadReal = upload.single('image');

exports.showAllReals = catchAsync(async (req,res,next) => {
    const real = new Real();
    const showAllReals = await real.showAllReals();

    res.status(200).json({
        message: showAllReals
    });
});

exports.showSingleReal = catchAsync(async (req,res,next) => {
    const real = new Real(req.body.id);
    const showSingleReal = await real.showSingleReal();

    res.status(200).json({
        message: showSingleReal
    });
});

exports.showProfileReals = catchAsync(async (req,res,next) => {
    const real = new Real(...[,req.body.userId]);
    const showProfileReals = await real.showProfileReals();

    res.status(200).json({
        message: showProfileReals
    });
});

exports.createReal = catchAsync(async (req,res,next) => {
    const real = new Real(...[
        , 
        req.body.userId,
        `${req.protocol}://${req.get('host')}/public/reals/${req.file.filename}`,
    ]);
    const createReal = await real.createReal();

    res.status(200).json({
        message: createReal
    });
});

exports.deleteReal  = catchAsync(async (req,res,next) => {
    const real = new Real(req.body.id);
    const deleteReal = await real.deleteReal();

    res.status(200).json({
        message: deleteReal
    });
});