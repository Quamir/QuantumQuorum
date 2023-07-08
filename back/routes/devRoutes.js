const express = require('express');
const router = express.Router();
const devData = require('../dev_data/devControler');

router.post('/geninitalusers',devData.genInitialUsers);
router.post('/genpost', devData.genPost);
router.post('/genreals', devData.genReals);
router.post('/genpostlikes', devData.genPostLikes);
router.post('/genpostcomments', devData.genPostComments);
router.post('/gencommentlikes', devData.genCommentLikes);
router.post('/genreplies', devData.genReplies);


router.get('/getbacon', devData.getBacon);
router.get('/initialfriendrelations', devData.genInitialFrindRelations);

module.exports = router;