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
