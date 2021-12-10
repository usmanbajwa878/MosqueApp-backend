const {
    MOSQUE_EXISTS,
    MOSQUE_NOT_EXISTS,
    MOSQUE_SUCCESS_GET,
    MOSQUE_SUCCESS_POST,
    SUCCESS_FALSE,
    SUCCESS_TRUE,
    MOSQUE_SUCCESS_UPDATE,
    MOSQUE_DELETED_SUCCESS,
} = require('../Constants/Message');
const {
    FAILED,
    OK,
    UN_AUTH,
    SUCCESS
} = require('../Constants/StatusCode');
const { generateMessage, } = require('../utils/generateMessage');
const { createMosque,getAllMosques,findMosque,findMosqueById,updateMosque,findMosqueByAnykey,deleteMosque } = require('../utils/utilities');



exports.CreateMosque= async (req, res) => {
    try {
        const result = await findMosque(req, res);
        const { data } = result;
        console.log("mosque Data",data);
        if (!data) {
            const mosque = createMosque(req);
            await mosque.save();
            return res.status(OK).json(generateMessage(MOSQUE_SUCCESS_POST, OK, SUCCESS_TRUE, mosque));
        }
        return res.status(FAILED).json(generateMessage(MOSQUE_EXISTS, FAILED, SUCCESS_FALSE, null));
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

//find mosque by name and phoneNumber
exports.FindMosque = async (req, res) => {
    try {
        const result = await findMosque(req, res);
        console.log("result",result);
        const { data } = result;
        if (data) {
            return res.status(OK).json(generateMessage(MOSQUE_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}
exports.DeleteMosque = async (req, res) => {
    try {
        const result = await deleteMosque(req, res);
        console.log("result of delete",result);
     
        if (result) {
            return res.status(OK).json(generateMessage(MOSQUE_DELETED_SUCCESS, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}
//find mosque by any key
exports.FindMosqueByAnyKey = async (req, res) => {
    try {
        const result = await findMosqueByAnykey(req, res);
        console.log("result",result);
        const { data } = result;
        if (data) {
            return res.status(OK).json(generateMessage(MOSQUE_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

exports.GetAllMosques = async (req, res) => {
    try {
        const result = await getAllMosques(req, res);
        const { data } = result;
        if(data){
            return res.status(SUCCESS).json(generateMessage(MOSQUE_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data));
        }else {
        return res.status(FAILED).json(generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
            
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}


exports.GetMosqueById = async (req, res) => {
    try {
        const result = await findMosqueById(req)
        const { data, success } = result;
        console.log("data", result)
        if (success) {
            return res.status(OK).json(generateMessage(MOSQUE_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }

}


exports.UpdateMosque = async (req, res) => {
    try {
        const result = await updateMosque(req);
        const { success } = result;
        if (success) {
            return res.status(OK).json(generateMessage(MOSQUE_SUCCESS_UPDATE, SUCCESS, SUCCESS_TRUE, null))
        } else {
            return res.status(UN_AUTH).json(generateMessage(MOSQUE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}