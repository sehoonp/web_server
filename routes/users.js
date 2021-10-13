var express = require('express');
var usersHandler = require('../handlers/usersHandler');
var router = express.Router();
const util = require('./util')

/* GET users listing. */
router.post('/login', async function(req, res, next) {
  const {success, data} = await usersHandler.loginHandler(req, res);
  if (!success) {
    util.errResp(res, "cannot login")
    return
  }
  util.successResp(res, "log in successfully")
  return
});

// sign up route
router.post('/signup', async function(req, res, next) {
  const {success, data} = await usersHandler.signupHandler(req, res, next);
  if (!success) {
    util.errResp(res, "cannot sign up")
    return
  }
  util.successResp(res, "sign up successfully")
  return 
});

// logout route
router.post('/logout', async function(req, res, next) {
  const success = await usersHandler.logoutHandler(req, res, next);
  if (!success) {
    util.errResp(res, "cannot logout")
    return
  }
  util.successResp(res, "log out successfully")
  return 
});
module.exports = router;
