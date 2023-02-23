const User = require('../models/userModel')
const ErrorHander = require('../utils/errorhande')
const sendemail = require('../utils/sendEmail.js')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/sentjwt')
exports.createUser = catchAsyncError(async(req,res)=>{

    if(!req.body.email){
        return res.status(200).json({
            success: false,
            message: 'Email id Is Required'
        })
    }
    const checkEmailExist = await User.findOne({
        email: req.body.email
    })
    if(checkEmailExist){
        return res.status(200).json({
            success: false,
            message: 'Email Id Already Registered'
        })
    }

    const user = await User.create(req.body)

    // const getJWTToken = user.getJWTToken()
    sendToken(user,200,res)
    // return res.status(200).json({
    //     success: true,
    //     getJWTToken
    // })
})


exports.loginUser = catchAsyncError(async(req,res,next)=>{

    const {email, password } = req.body
    if(!email || !password){
        return next(new ErrorHander("Please Enter Email And Password",400))
    }

    const user = await User.findOne({email}).select("password")
    if(!user){
        return next(new ErrorHander("Invalid Email or Passsword", 401))
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHander("Invalid Password", 401))
    }
    sendToken(user,200,res)
})


exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    return res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})