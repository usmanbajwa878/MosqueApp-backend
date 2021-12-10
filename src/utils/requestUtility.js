const User = require("../Models/User");
const Mosque = require("../Models/Mosque");
const Request = require("../Models/Request");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateMessage } = require("./generateMessage");
const {
  USER_EXISTS,
  USER_NOT_EXISTS,
  SUCCESS_FALSE,
  SUCCESS_TRUE,
  MOSQUE_NOT_EXISTS,
  MOSQUE_SUCCESS_UPDATE,
  MOSQUE_FAILED_UPDATE,
  MOSQUE_EXISTS,
  MOSQUE_SUCCESS_GET,
  MOSQUE_DELETED_SUCCESS,
  REQUEST_DELETED_SUCCESS,
  REQUEST_EXISTS,
  REQUEST_FAILED_UPDATE,
  REQUEST_NOT_EXISTS,
  REQUEST_SUCCESS_GET,
  REQUEST_SUCCESS_POST,
  REQUEST_SUCCESS_UPDATE
} = require("../Constants/Message");
const {
  OK,
  UN_AUTH,
  FAILED,
  SUCCESS,
} = require("../Constants/StatusCode");
const { translateObject } = require("./translate");



exports.createRequest = (req) => {
  const request = new Request({
    requestId: mongoose.Types.ObjectId(),
    name:req.body.name,
    image:req.body.image,
    status:req.body.status,//approved,live,pending
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    moazan:req.body.moazan,
    timings:req.body.timings,
    location:req.body.location,
    slideShowImages:req.body.slideShowImages,
    ramzanImage:req.body.ramzanImage,
    city:req.body.city,
    country:req.body.country,
    zipCode:req.body.zipCode,
    facilites:req.body.facilites,
    phoneNumber:req.body.phoneNumber,
    emailAddress:req.body.emailAddress,
    requestedBy:req.body.requestedBy 

  });
  return request;
};


exports.findRequestByUser = async (req) => {
  const data = await Request.find({ requestedBy: req.body.requestedBy })
    .exec()
    .then((request) => {
      if (request.length !== 0) {
        return generateMessage(
          REQUEST_SUCCESS_GET,
          SUCCESS,
          SUCCESS_TRUE,
          request
        );
      }
      return generateMessage(REQUEST_NOT_EXISTS, FAILED, SUCCESS_FALSE, null);
    });
  return data;
};

exports.findRequestByUserForMosque = async (req) => {
  const data = await Request.find({ requestedBy: req.body.requestedBy,name:req.body.name })
    .exec()
    .then((request) => {
      if (request.length !== 0) {
        return generateMessage(
          REQUEST_SUCCESS_GET,
          SUCCESS,
          SUCCESS_TRUE,
          request
        );
      }
      return generateMessage(REQUEST_NOT_EXISTS, FAILED, SUCCESS_FALSE, null);
    });
  return data;
};


exports.getAllRequest = async (req) => {
  const data = await Request.find()
    .exec()
    .then((request) => {
      if (request.length !== 0) {
        return generateMessage(
          REQUEST_SUCCESS_GET,
          OK,
          SUCCESS_TRUE,
          request
        );
      }
      return generateMessage(REQUEST_NOT_EXISTS, FAILED, SUCCESS_FALSE, null);
    });
  return data;
};


exports.deleteReuqest = async (req) => {
 const request = await Request.deleteOne({name:req.body.name,phoneNumber:req.body.phoneNumber}).exec();
 console.log("request",request)
 return request.deletedCount
};

