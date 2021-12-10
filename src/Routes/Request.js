const {
    SUCCESS_FALSE,
    SUCCESS_TRUE,
    REQUEST_SUCCESS_POST,
    REQUEST_EXISTS,
    REQUEST_SUCCESS_GET,
    REQUEST_NOT_EXISTS,
    REQUEST_DELETED_SUCCESS,
} = require('../Constants/Message');
const {
    FAILED,
    OK,
    SUCCESS
} = require('../Constants/StatusCode');
const { generateMessage, } = require('../utils/generateMessage');
const { createRequest, getAllRequest, deleteReuqest, findRequestByUser,findRequestByUserForMosque } = require('../utils/requestUtility');



exports.createRequest = async (req, res) => {
    try {
        const result = await findRequestByUserForMosque(req, res);
        const { data } = result;
        console.log("request Data", data);
        if (!data) {
            const request = createRequest(req);
            await request.save();
            return res.status(OK).json(generateMessage(REQUEST_SUCCESS_POST, OK, SUCCESS_TRUE, request));
        }
        return res.status(FAILED).json(generateMessage(REQUEST_EXISTS, FAILED, SUCCESS_FALSE, null));
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

//find mosque by name and phoneNumber
exports.getUserRequests = async (req, res) => {
    try {
        const result = await findRequestByUser(req, res);
        console.log("result", result);
        const { data } = result;
        if (data) {
            return res.status(OK).json(generateMessage(REQUEST_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(REQUEST_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}


exports.DeleteRequest = async (req, res) => {
    try {
        const result = await deleteReuqest(req, res);
        console.log("result of delete", result);

        if (result) {
            return res.status(OK).json(generateMessage(REQUEST_DELETED_SUCCESS, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(REQUEST_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}


exports.GetAllRequests = async (req, res) => {
    try {
        const result = await getAllRequest(req, res);
        const { data } = result;
        if (data) {
            return res.status(SUCCESS).json(generateMessage(REQUEST_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data));
        } else {
            return res.status(FAILED).json(generateMessage(REQUEST_EXISTS, FAILED, SUCCESS_FALSE, null))

        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

