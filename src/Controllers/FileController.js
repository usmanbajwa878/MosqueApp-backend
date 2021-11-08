const express = require("express");
const {
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILED,
  SUCCESS_TRUE,
} = require("../Constants/Message");
const router = express.Router();
const { FILE_UPLOAD, GET_FILE } = require("../Constants/Routes");
const { SUCCESS } = require("../Constants/StatusCode");
const { generateMessage } = require("../utils/generateMessage");
const { IMAGE_UPLOAD } = require("../utils/multer");

exports.FILE_UPLOAD_REQUEST = router.post(
  FILE_UPLOAD,
  IMAGE_UPLOAD,
  (req, res) => {
    return res
      .status(SUCCESS)
      .json(
        generateMessage(FILE_UPLOAD_SUCCESS, SUCCESS, SUCCESS_TRUE, req.file)
      );
  }
);
exports.GET_FILE = router.get(GET_FILE, (req, res) => {
  res.sendFile(path.join(__dirname, "/uploads/ "+req.query.image));
});
