const multer = require('multer');
const fs = require('fs');
const pool = require('../database');

class Media{
    constructor(des,id,image){
        this.des = des;
        this.id = id;
        this.image = image;
    }

    uploadProfilePicture(){
       const multerStorage = multer.diskStorage({
        destination: (req,res,cb) => {
            cb(null, this.des);
        },
        filename: (req,file,cb) => {
            const name = file.originalname.split('.')[0];
            const extension = file.mimetype.split('/')[1];
            cb(null, name + Date.now() + '.' + extension);
        }
       });

       const multerfilter = (req,file,cb) => {
        if(file.mimetype.startsWith('image')){
            cb(null,true);
        }
       }

       const upload = multer({
        storage: multerStorage,
        fileFilter: multerfilter
       });
       return upload;
    }
}

module.exports = Media;