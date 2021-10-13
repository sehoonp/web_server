const { token } = require('morgan');
const sessionHandler = require('../database/models/session');
const util = require('../routes/util');

const validateAuthCookies = async (req, res, next) => {
    var cookie = req.cookies.access_token;
    session = await sessionHandler.hasSession(cookie).success
    if (cookie && session) {
      console.log("has access token")
      next();
    } else {
      util.errResp(res, "no access")
      return
    }
}

const setAuthCookies = async (userID, res) => {
  const {data} = await sessionHandler.createSession(userID)
  res.cookie('access_token', data, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })
  return
}

const getAuthCookies = (req) => {
  return req.cookies.access_token;
}

module.exports = {
    validateAuthCookies,
    setAuthCookies,
    getAuthCookies
}