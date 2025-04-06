// Queue/email.processor.js
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendWelcomeEmail = async (job, done) => {
    console.log(`🛠️ Processing job ID: ${job.id} | Data:`, job.data);

    const filePath = path.join(__dirname, '../templates', 'welcomeEmail.html');

    if (!fs.existsSync(filePath)) {
        const errMsg = `❌ Template not found at: ${filePath}`;
        console.error(errMsg);
        return done(new Error(`File not found: ${filePath}`));
    }

    const { email, firstName } = job.data;

    const htmlTemplate = fs.readFileSync(filePath, 'utf8').replace(/{{firstName}}/g, firstName);

    const mailOptions = {
        from: 'omdey3424@gmail.com',
        to: email,
        subject: 'Welcome to ShopEase!',
        html: htmlTemplate,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email successfully sent to: ${email}`);
        done();
    } catch (err) {
        console.error(`❌ Failed to send email to ${email}:`, err.message);
        done(new Error(err.message));
    }
};

module.exports = sendWelcomeEmail;
