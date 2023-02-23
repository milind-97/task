const catchAsyncError = require('../middleware/catchAsyncErrors')
const ErrorHander = require('../utils/errorhande')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
exports.isAuthenticateUser = catchAsyncError(async(req,res,next)=>{
    const token = req.cookies.token
    console.log(token)
    if(!token){
        return next(new ErrorHander("Please Login To Access This Resource",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findOne({
        _id: decodedData.id
    })
    if(!user){
        return next(new ErrorHander("User Not Exist",401))
    }
    req.user = await User.findOne({
        _id: decodedData.id
    })
     next()
})


exports.authorizeRole = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(`Role: ${req.user.role} is Not Allowed To Access This Source`,403))
        }
        next()
    }
    
    
}