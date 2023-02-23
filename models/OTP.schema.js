const mongoose = require('mongoose');
const validator = require('validator')
const otpSchema = mongoose.Schema({
  otp: {
    type: Number,
    min: [4, 'OTP Must Be 4 Digits'],
    required: [true, 'OTP Field Can Not Be Empty'],
    unique: true,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("otps",otpSchema)
