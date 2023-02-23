const nodemailer = require('nodemailer')
// const { options } = require('../app')

const sendEmail = async (options)=>{

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "milind.sansare@ayekart.com",
            pass:"Milu9730@"
        }
    })
    const mailOptions = {
        from: "milind.sansare@ayekart.com",
        to: options.email,
        subject: options.subject,
        Text: options.message
    }
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail
