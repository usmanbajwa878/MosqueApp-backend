const express = require('express');
const router = express.Router();

const { createRequest, GetAllRequests,DeleteRequest,getUserRequests } = require('../Routes/Request');
const { REQUEST_GET_ALL,REQUEST_GET_BY_USER,REQUEST_POST ,REQUEST_DELETE} = require('../Constants/Routes');


exports.GET_ALL_REQUEST = router.get(REQUEST_GET_ALL,GetAllRequests);
exports.GET_REQUEST_BY_USER = router.post(REQUEST_GET_BY_USER,getUserRequests);
exports.CREATE_REQUEST= router.post(REQUEST_POST,createRequest);
exports.DELETE_REQUEST = router.post(REQUEST_DELETE,DeleteRequest);