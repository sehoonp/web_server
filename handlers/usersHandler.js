const userModel = require('../database/models/user')
const cookieHandler = require('../middleware/cookies')
const sessionHandler = require('../database/models/session')

const loginHandler = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const {success, data} = await userModel.hasUser(username, password)
    // set cookie & store session
    if (success) {
        await cookieHandler.setAuthCookies(data.dataValues.user_id, res)
    }
    return {
        success,
        data
    }
};

const signupHandler = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const {success, data} = await userModel.createUser(username, password)
    return {
        success,
        data
    }
};

const logoutHandler = async (req, res, next) => {
    const sessionID = cookieHandler.getAuthCookies(req);
    await sessionHandler.deleteSession(sessionID)
    return true
};

module.exports = {
    loginHandler,
    signupHandler,
    logoutHandler
}