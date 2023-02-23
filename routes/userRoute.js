const express = require('express')
const { createUser, loginUser, logout } = require('../controllers/userController')
const sent_otp = require('../controllers/sendOTP.controller');
const verifyotp = require('../controllers/verify.user');
const { isAuthenticateUser,authorizeRole } = require('../middleware/auth')
const router = express.Router()

router.route('/user').post(createUser)

router.route('/login').post(loginUser)
router.route('/sentOTP').post(sent_otp.sendOTP)
router.route('/verify').put(verifyotp.verifyUser)
router.route('/logout').get(logout)

module.exports = router