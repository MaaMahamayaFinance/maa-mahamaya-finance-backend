const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});




async function sendOtpEmail(email, otp) {
    const mailOptions = {
        from: `"Maa Mahamaya Finance" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP for Maa Mahamaya Finance Registration',
        text: `Dear User,

    Your One-Time Password (OTP) for completing your registration is: ${otp}

    Please enter this OTP to verify your email address. This code will expire in 10 minutes.

    If you did not request this OTP, please ignore this email or contact our support team.

    Thank you,
    Maa Mahamaya Finance Team`,

        html: `
        <div style="font-family: Arial, sans-serif; padding: 15px; background-color: #f9f9f9; color: #333;">
            <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://maamahamayafinancebucket.s3.ap-south-1.amazonaws.com/profile-images/logo.png" alt="Maa Mahamaya Finance" style="height: 60px;" />
            </div>
            <h2 style="color: #4A90E2;">Verify Your Email Address</h2>
            <p>Dear User,</p>
            <p>Thank you for registering with <strong>Maa Mahamaya Finance</strong>.</p>
            <br/>
            <p>Your One-Time Password (OTP) is:</p>
            <p style="font-size: 28px; font-weight: bold; color: #000; text-align: center; margin: 20px 0;">${otp}</p>
            <p>This OTP is valid for <strong>10 minutes</strong>.<br/> Please enter it in the registration form to complete your verification process.</p> <br/>
            <p>If you did not request this code, no further action is required. <br/> You can safely ignore this email, or reach out to us for help.</p> <br/>
            <p>Need assistance? Contact our support team at <br/> <a href="mailto:support@maamahayamafinance.com">support@maamahayamafinance.com</a>.</p>
            <br/>
            <p>Best Regards,</p>
            <p><strong>Maa Mahamaya Finance Team</strong></p>
            <hr style="margin-top: 30px;"/>
            <p style="font-size: 12px; color: #888; text-align: center;">
                This is an automated message. Please do not reply to this email.
            </p>
            </div>
        </div>
        `,
    };

    await transporter.sendMail(mailOptions);
}



module.exports = sendOtpEmail;