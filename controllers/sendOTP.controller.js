
const OTPModel = require('../models/OTP.schema');
const nodemailer = require('nodemailer');
// const Broker = require('../../_broker_/_broker_');

exports.sendOTP = async (req, res) => {
  if (!req.body.email) {
    return res.json({ message: 'Please Enter Email Id', status: false });
  }
  try {
    const ismobileExist = await OTPModel.findOne({
      email: req.body.email
    })
    const OTP = Math.floor(1000 + Math.random() * 9000);
    if (ismobileExist !== null) {
      ismobileExist.updatedAt = new Date()
      ismobileExist.otp = OTP
      ismobileExist.save()
      await send_amil(req.body.email,OTP)
    return res.status(200).json({
        success: true,
        message: 'OTP Sent Successfully'
    })
    }
    const now = new Date();
    console.log('=====Generate OTP Controller=====');
    
    console.log(OTP);
    const saveOTP = new OTPModel({
      otp: OTP,
      email: req.body.email,
    });
    const otp = await saveOTP.save();
    if (!otp._id && !otp.otp) {
      return res.json({
        message: 'Can Not Create OTP At This Moment Plase Try Again',
        success: false,
      });
    }
    await send_amil(req.body.email,OTP)
    return res.status(200).json({
      success: true,
      message: 'OTP Sent Successfully'
    })
  }catch(err){
    console.log(err,'==============')
    return res.status(200).json({
      success: false,
      message: 'Something Went Wrong'
    })
  }
};

async function send_amil(email,otp){
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'msansare17@gmail.com',
        pass: 'yqzmkkhvvjvujbph'
    }
});
 
let mailDetails = {
    from: 'msansare17@gmail.com',
    to: email,
    subject: 'Test mail',
    text: `${otp} is your otp. this otp is valid for 5 minutes only.`
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log(err,'Error Occurs');
      
    } else {
        console.log('Email sent successfully');
         
    }
    return
});
}
