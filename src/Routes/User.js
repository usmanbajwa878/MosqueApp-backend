const {
    USER_EXISTS,
    USER_NOT_EXISTS,
    USER_SUCCESS_LOGIN,
    USER_SUCCESS_SIGNUP,
    USER_AUTH_FAILED,
    SUCCESS_FALSE,
    SUCCESS_TRUE,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILED,
} = require('../Constants/Message');
const {
    FAILED,
    OK,
    UN_AUTH,
    SUCCESS
} = require('../Constants/StatusCode');
const { generateMessage, } = require('../utils/generateMessage');
const { createUser, findUser,getAllUsers,comparePassword,changePassword,getAllUsersByLangauge } = require('../utils/utilities');





exports.SignUp = async (req, res) => {
    try {
        const result = await findUser(req, res);
        console.log("result",result);
        const { data } = result;
        if (!data) {
        
         
            const user = await createUser(req);
            console.log("saving user",user)
            await user.save();
            return res.status(OK).json(generateMessage(USER_SUCCESS_SIGNUP, OK, SUCCESS_TRUE, user));
        }
        return res.status(FAILED).json(generateMessage(USER_EXISTS, FAILED, SUCCESS_FALSE, null));
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}




exports.ChangePassword = async (req, res) => {
    try {
        const result = await findUser(req, res);
        console.log("result",result);
        const { data } = result;
        if (data) {
            const user = await changePassword(req);
            console.log("saving user",user)
            await user.save();
            return res.status(OK).json(generateMessage(PASSWORD_CHANGE_SUCCESS, SUCCESS, SUCCESS_TRUE, null));
        }
        return res.status(FAILED).json(generateMessage(PASSWORD_CHANGE_FAILED, FAILED, SUCCESS_FALSE, null));
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

exports.Login = async (req, res) => {
    console.log(req.body)
    try {
        const result = await findUser(req, res);
        console.log("result",result);
        const { data } = result;
        if (data && data.length > 0) {
            const userData = data[0];
            const isMatched = await comparePassword(req.body.password,userData.password);
            if(isMatched){
                return res.status(OK).json(generateMessage(USER_SUCCESS_LOGIN, SUCCESS, SUCCESS_TRUE, data))
            }else {
                return res.status(UN_AUTH).json(generateMessage(USER_AUTH_FAILED, FAILED, SUCCESS_FALSE, null))
            }
            
        } else {
            return res.status(UN_AUTH).json(generateMessage(USER_NOT_EXISTS, UN_AUTH, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

exports.GetAllUsers = async (req, res) => {
    try {
        const result = await getAllUsers(req, res);
        const { data } = result;
        return res.status(SUCCESS).json(generateMessage(USER_EXISTS, SUCCESS, SUCCESS_TRUE, data));
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}
exports.GetAllUsersByLangauge = async(req,res) =>{
    try {
        const result = getAllUsersByLangauge(req,res)
    } catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}