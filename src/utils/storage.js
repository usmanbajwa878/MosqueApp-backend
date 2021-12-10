const express = require('express');
const { uuid } = require('uuidv4');
const router = express.Router()
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

var uuidpublic;

const storage = new Storage({
    projectId: "e-app-b5e7f",
    //keyFilename:apifile
    keyFilename: './src/mosqueapp-63cfb-firebase-adminsdk-k6n1e-311203377f.json'
});

const bucket = storage.bucket("gs://mosqueapp-63cfb.appspot.com/Requests");
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});



/**
 * Adding new file to the storage
 */
exports.IMAGE_UPLOAD = router.post('/fileUpload', multer.single('file'), (req, res, next) => {

    console.log('Upload Image',req);
    console.log("REQUEST FILE",req.file);
    uuidpublic = uuid()
    let file = req.file.originalname;
    filepubic = file
    console.log("file NAME",file)
    if (!req.file) {
        return res.status(422).json({
            message: "no file found for uploading",
            status: res.statusCode
        })
    } else {

        const blob = bucket.file(req.file.originalname)
        const blobStream = blob.createWriteStream();
        let newFileName = `${file.originalname}_${Date.now()}`;
        let fileUpload = bucket.file(newFileName);


        blobStream.on('error', (err) => {
            console.log("ERROR", err);
            return res.status(422).json({
                message: "" + err,
                status: res.statusCode,
                success: false
            });
        });

        blobStream.on('finish', (data) => {
            console.log('finishing', data)
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file) + "?alt=media&token=" + uuidpublic);
            //const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}?access_token=${token}"`);
            return res.status(200).json({
                message: "Image Uploaded Successfully",
                status: res.statusCode,
                data: publicUrl,
                success: true
            })
        });

        blobStream.end(req.file.buffer);
    }

});



// router.post('/postImage',multer.single('file'), (req, res,next) => {
//   let file = req.file.originalname;
//   filepubic = file
// console.log(file)
//   if(!req.file){
//    return res.status(422).json({
//       message:"no file found for uploading",
//       status:res.statusCode
//     })
//   }else{
//     cloudinary.uploader.upload(file)
//     .then((result) => {
//       response.status(200).send({
//         message: "success",
//         result,
//       });
//     }).catch((error) => {
//       response.status(500).send({
//         message: "failure",
//         error,
//       });
//     });

//   }

// })


module.exports = router