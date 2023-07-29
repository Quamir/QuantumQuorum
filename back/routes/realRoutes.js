const express = require('express');
const router = express.Router();
const realController = require('../Controllers/realControler');


//READ
router.get('/getallreals', realController.showAllReals);
router.get('/getsinglereal', realController.showSingleReal);
router.get('/getprofilereals', realController.showProfileReals);

//CREATE
router.post(
    '/createreal',
    realController.uploadReal, 
    realController.createReal
);

//DELETE
router.delete('/deletereal', realController.deleteReal);


module.exports = router;