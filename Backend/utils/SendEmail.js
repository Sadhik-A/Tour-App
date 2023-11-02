const { response } = require("express");
const nodemailer = require("nodemailer");
module.exports = async function (email, subject, message) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: Number(process.env.SMTP_PORT),
            secure: Boolean(process.env.SMTP_SECURE),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
  await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: message
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not send");
        console.log(error)
    }
}
