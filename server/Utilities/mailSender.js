const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailsended = await transporter.sendMail({
      from: `"K-TECH" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    return mailsended;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
