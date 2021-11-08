const express = require('express');
const router = express.Router();
const { SignUp, Login,ChangePassword,GetAllUsersByLangauge } = require('../Routes/User');
const {USER_LOGIN, USER_SIGNUP,FORGET_PASSWORD,USER_GET_ALL_BY_LANGUAGE } = require('../Constants/Routes');

exports.LOGIN = router.post(USER_LOGIN,Login);
exports.SIGNUP = router.post(USER_SIGNUP,SignUp);
exports.CHANGE_PASSWORD = router.post(FORGET_PASSWORD,ChangePassword);
exports.GET_USERS_BY_LANGUAGE = router.post(USER_GET_ALL_BY_LANGUAGE,GetAllUsersByLangauge);