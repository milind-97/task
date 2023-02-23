const ErrorHandler = require('../utils/errorhande')

module.exports= (err,req,res,next)=>{

    err.statusCode= err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.name === "CastError"){
        const message = `Resource not Found. invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400)
    }
    if(err.name === "JsonWebTokenError"){
        const message = "JSON Web Token Is Invalid, Try Again"
        err = new ErrorHandler(message,400)
    }
    if(err.name === "TokenExpireError"){
        const message = "JSON Web Token Is Expired, Try Again"
        err = new ErrorHandler(message,400)
    }
    res.status(err.statusCode).json({   
        success: false,
        message: err.message
    })
}