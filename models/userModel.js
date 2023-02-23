const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please Enter User Name'],
        maxLength:[30,'Name Cannot Exceed 30 Characters'],
        minLength:[3,'Name Cannot Be Less Than 3 Characters'],
    },
    email: {
        type: String,
        required: [true,'Please Enter Email Id'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter valid Email']
    },
    password:{
        type: String,
        required:[true,'Please Enter Your Password'],
        select: false


    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})
userSchema.methods.getJWTToken = function getJWTToken (){
    return jwt.sign({
        id: this._id
    },'test',{
        expiresIn: '300s'
    })
}
userSchema.methods.comparePassword = async function(enterPassword){
    return bcrypt.compare(enterPassword, this.password)
}
userSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("SHA256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken 
}

module.exports = mongoose.model("User",userSchema)