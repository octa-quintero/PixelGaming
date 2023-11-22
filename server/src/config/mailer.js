const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'octa.quinteroo@gmail.com',
    pass: process.env.API_PASSWORD,
  },
});

module.exports = transporter;
