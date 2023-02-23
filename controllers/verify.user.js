
const OTPModel = require('../models/OTP.schema');


exports.verifyUser = async (req, res) => {
 if(!req.body.email){
  return res.status(200).json({
    success: false,
    message: `Please Enter Email Id`
  })
 }
 if(!req.body.otp){
  return res.status(200).json({
    success: false,
    message: `Please Enter OTP`
  })
 }
  try {
    const verifyOtp = await OTPModel.findOne({
      email: req.body.email,
    });
    console.log(verifyOtp,'====================Verified');
    if (!verifyOtp) {
      return res.status(200).json({
        success: false,
        message: `Please Click On Resend OTP`
      })
      // console.log(
      //   `Please Click On Resend OTP`,
      // ); 
    }
    if(verifyOtp.otp != req.body.otp){
      return res.json({ status: false, message: 'Invalid OTP Click on Resend OTP' });
    }
    let diffInMilliSeconds =
    Math.abs(new Date(verifyOtp.updatedAt) - new Date()) / 1000
const minutes = Math.floor(diffInMilliSeconds / 60) % 60
diffInMilliSeconds -= minutes * 60
if (minutes >= 5) {
  // if otp expired dont allow user to login
  return res.status(200).json({
    status: false,
    message:
        'OTP Is Expired Please Click on Resend OTP To Recieve New OTP'
  })
} else {
  // if otp id not expired allow user to login and delete the otp
  verifyOtp.remove()
  return res.status(200).json({
    success: true,
    message: 'OTP VErified Successfully'
  })
}

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: 'Error occured while verifying user.',
      errorCode: 500,
    });
  }
};
