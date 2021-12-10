const multer = require('multer');

var admin = require("firebase-admin");

var serviceAccount = require("../mosqueapp-63cfb-firebase-adminsdk-k6n1e-311203377f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
        console.log("file",file);
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

exports.IMAGE_UPLOAD = multer({
    storage: Storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/jpg|jpeg|png|gif$i/)) {
            cb(new Error('File is not Supported'), false)
        }
        cb(null, true)
    }
}).single('image');