exports.generateMessage = (message, status, success, data) => {
    return {
        message: message,
        status: status,
        success: success,
        data: data
    }
}