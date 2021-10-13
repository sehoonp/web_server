const SUCCESS_CODE = 200
const ERR_CODE = 400

const successResp = (res, msg) => {
    res.statusCode = SUCCESS_CODE
    res.send(msg)
}

const errResp = (res, msg) => {
    res.statusCode = ERR_CODE
    res.send(msg)
}

module.exports = {
    successResp, 
    errResp
}
