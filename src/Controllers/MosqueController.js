const express = require('express');
const router = express.Router();

const { CreateMosque, FindMosque,GetAllMosques,GetMosqueById,UpdateMosque, FindMosqueByAnyKey,DeleteMosque } = require('../Routes/Mosque');
const {MOSQUE_GET_BY_ID, MOSQUE_POST,MOSQUE_GET_ALL,MOSQUE_UPDATE,MOSQUE_SPECIFIC,MOSQUE_SPECIFIC_ANY,MOSQUE_DELETE } = require('../Constants/Routes');


exports.UPDATE_MOSQUE= router.post(MOSQUE_UPDATE,UpdateMosque);
exports.GET_ALL_MOSQUE = router.get(MOSQUE_GET_ALL,GetAllMosques);
exports.GET_MOSQUE_BY_ID = router.post(MOSQUE_GET_BY_ID,GetMosqueById);
exports.CREATE_MOSQUE= router.post(MOSQUE_POST,CreateMosque);
exports.FIND_SPECFIC_MOSQUE = router.post(MOSQUE_SPECIFIC,FindMosque);
exports.FIND_MOSQUE_BY_ANY = router.post(MOSQUE_SPECIFIC_ANY,FindMosqueByAnyKey);
exports.DELETE_MOSQUE = router.post(MOSQUE_DELETE,DeleteMosque);