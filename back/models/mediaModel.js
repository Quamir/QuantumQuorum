const multer = require('multer');
const fs = require('fs');
const pool = require('../database');

class Media{
    constructor(des,id,image){
        this.des = des;
        this.id = id;
        this.image = image;
    }

    uploadMedia(){
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

    unLink(folder, filename){
        const imageName = filename.split('/')[5];
        const path = folder + `/${imageName}`;

        console.log(path);

        fs.unlink(path, error => {
            if(error){
                return 'file deleted';
            }else{
                return 'Something went wrong';
            }
        });
    }

}

module.exports = Media;