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

const sendOrderStatusEmail = async (job, done) => {
    const filePath = path.join(__dirname, '../templates', 'orderStatusEmail.html');

    if (!fs.existsSync(filePath)) {
        return done(new Error(`Template not found: ${filePath}`));
    }

    const {
        email,
        firstName,
        orderId,
        orderStatus,
        totalAmount,
        shippingAddress,
        trackingNumber,
    } = job.data;

    let htmlTemplate = fs.readFileSync(filePath, 'utf8');
    htmlTemplate = htmlTemplate
        .replace(/{{firstName}}/g, firstName)
        .replace(/{{orderId}}/g, orderId)
        .replace(/{{orderStatus}}/g, orderStatus)
        .replace(/{{totalAmount}}/g, totalAmount.toFixed(2))
        .replace(/{{fullName}}/g, shippingAddress.fullName)
        .replace(/{{address}}/g, shippingAddress.address)
        .replace(/{{city}}/g, shippingAddress.city)
        .replace(/{{state}}/g, shippingAddress.state)
        .replace(/{{pincode}}/g, shippingAddress.pincode)
        .replace(/{{year}}/g, new Date().getFullYear())
        .replace(/{{trackingNumber}}/g, trackingNumber || "Not Available");

    const mailOptions = {
        from: 'omdey3424@gmail.com',
        to: email,
        subject: `Your Order #${orderId} is ${orderStatus}`,
        html: htmlTemplate,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📦 Order update email sent to ${email}`);
        done();
    } catch (err) {
        console.error(`❌ Failed to send order email:`, err.message);
        done(new Error(err.message));
    }
};

// Add this to email.processor.js
const sendNewsletterEmail = async (job, done) => {
    const filePath = path.join(__dirname, '../templates', 'newsletterEmail.html');

    if (!fs.existsSync(filePath)) {
        return done(new Error(`Template not found: ${filePath}`));
    }

    const { email, subject, content, firstName } = job.data;

    let htmlTemplate = fs.readFileSync(filePath, 'utf8');
    htmlTemplate = htmlTemplate
        .replace(/{{firstName}}/g, firstName || "Subscriber")
        .replace(/{{content}}/g, content)
        .replace(/{{year}}/g, new Date().getFullYear());

    const mailOptions = {
        from: 'omdey3424@gmail.com',
        to: email,
        subject: subject || '📰 Our Latest Newsletter!',
        html: htmlTemplate,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📨 Newsletter email sent to ${email}`);
        done();
    } catch (err) {
        console.error(`❌ Newsletter email failed:`, err.message);
        done(new Error(err.message));
    }
};

const sendContactEmail = async (job, done) => {
    const { name, email, subject, message } = job.data;

    const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>📬 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr/>
        <p style="font-size: 12px; color: gray;">Received on ${new Date().toLocaleString()}</p>
    </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'Shrutipal834@gmail.com', // <-- Replace this with your destination address
        subject: `Contact Form: ${subject}`,
        html: htmlTemplate,
        replyTo: email, // Makes it easy to reply directly to the user
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📩 Contact email sent from ${email}`);
        done();
    } catch (err) {
        console.error(`❌ Failed to send contact email:`, err.message);
        done(new Error(err.message));
    }
};

module.exports = {
    sendWelcomeEmail,
    sendOrderStatusEmail,
    sendNewsletterEmail,
    sendContactEmail,
};