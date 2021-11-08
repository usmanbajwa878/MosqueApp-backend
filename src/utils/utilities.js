const User = require("../Models/User");
const Mosque = require("../Models/Mosque");
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
  MOSQUE_DELETED_SUCCESS
} = require("../Constants/Message");
const {
  OK,
  UN_AUTH,
  FAILED,
  SUCCESS,
} = require("../Constants/StatusCode");
const { translateObject } = require("./translate");

const saltRounds = 10;

const hashPassword = async (password) => {
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    hashPasword = hash;
  });
  const hashedPasword = await bcrypt.hash(password, saltRounds);
  console.log("HASH", hashedPasword);
  return hashedPasword;
};

exports.comparePassword = async (password, hashPassword) => {
  console.log("passwords", password, hashPassword);
  const result = await bcrypt.compare(password, hashPassword);
  return result;
};

exports.createUser = async (req) => {
  const user = new User({
    userId: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    phoneNumber:req.body.phoneNumber,
    role:req.body.role
  });
  console.log("returning user", user);
  return user;
};
exports.changePassword = async (req) => {
  const user = User.findOneAndUpdate({ email: req.body.email },
    {$set:{password:await hashPassword(req.body.password)}}
  );
  console.log("returning user", user);
  return user;
};




exports.createMosque = (req) => {
  const mosque = new Mosque({
    mosqueId: mongoose.Types.ObjectId(),
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
    emailAddress:req.body.emailAddress

  });
  return mosque;
};

exports.findMosque = async (req) => {
  console.log("req.body",req.body);
  const data = await Mosque.find({name:req.body.name,phoneNumber:req.body.phoneNumber})
    .exec()
    .then((mosque) => {
      console.log("mosque",mosque)
      if (mosque.length !== 0) {
     
        return generateMessage(
          MOSQUE_EXISTS,
          SUCCESS,
          SUCCESS_TRUE,
          mosque
        );
      }
      return generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null);
    });
  return data;
};

exports.findMosqueByAnykey = async (req) => {
  const data = await Mosque.find(req.body)
    .exec()
    .then((mosque) => {
      if (mosque.length !== 0) {
        return generateMessage(
          MOSQUE_SUCCESS_GET,
          SUCCESS,
          SUCCESS_TRUE,
          mosque
        );
      }
      return generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null);
    });
  return data;
};

exports.findMosqueById = async (req) => {
  const data = await Mosque.find({ mosqueId: req.body.mosqueId })
    .exec()
    .then((mosque) => {
      if (mosque.length !== 0) {
        return generateMessage(
          MOSQUE_SUCCESS_GET,
          SUCCESS,
          SUCCESS_TRUE,
          mosque
        );
      }
      return generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null);
    });
  return data;
};

exports.updateMosque = async (req) => {
  const data = await Mosque.updateOne(
    { mosqueId: req.body.mosqueId },
    {
      $set: req.body,
    }
  )
    .exec()
    .then((mosque) => {
      console.log("updated", mosque);
      if (mosque.ok !== 0) {
        return generateMessage(MOSQUE_SUCCESS_UPDATE, OK, SUCCESS_TRUE, null);
      }
      return generateMessage(MOSQUE_FAILED_UPDATE, FAILED, SUCCESS_FALSE, null);
    });
  return data;
};

exports.getAllMosques = async (req) => {
  const data = await Mosque.find()
    .exec()
    .then((mosque) => {
      if (mosque.length !== 0) {
        return generateMessage(
          MOSQUE_SUCCESS_GET,
          OK,
          SUCCESS_TRUE,
          mosque
        );
      }
      return generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null);
    });
  return data;
};

exports.deleteMosque = async (req) => {
 const mosque = await Mosque.deleteOne({name:req.body.name,phoneNumber:req.body.phoneNumber}).exec();
 console.log("mosque",mosque)
 return mosque.deletedCount
};

exports.findUser = async (req, res) => {
  const data = await User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length !== 0) {
        return generateMessage(USER_EXISTS, UN_AUTH, SUCCESS_TRUE, user);
      }
      return generateMessage(USER_NOT_EXISTS, OK, SUCCESS_FALSE, null);
    });
  return data;
};

exports.getAllUsers = async (req) => {
  const data = await User.find()
    .exec()
    .then((users) => {
      if (users.length !== 0) {
        return generateMessage(USER_EXISTS, FAILED, SUCCESS_TRUE, users);
      }
      return generateMessage(USER_NOT_EXISTS, OK, SUCCESS_FALSE, null);
    });
  return data;
};
exports.getAllUsersByLangauge = async(language) =>{
  const data = await User.find()
    .exec()
    .then((users) => {
      if (users.length !== 0) {
      const updatedUsers =    users.map((item)=>translateObject(item,'fr'))
        return generateMessage(USER_EXISTS, FAILED, SUCCESS_TRUE, updatedUsers);
      }
      return generateMessage(USER_NOT_EXISTS, OK, SUCCESS_FALSE, null);
    });
    
  
}

