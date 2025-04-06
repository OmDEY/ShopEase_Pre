const Queue = require('bull');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Create a new queue instance
const emailQueue = new Queue('email', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
  },
});

console.log('📨 Test Email Queue Initialized');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Process jobs
emailQueue.process('sendEmail', async (job, done) => {
  const filePath = path.join(__dirname, '../templates', 'welcomeEmail.html');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Email template not found at ${filePath}`);
    return done(new Error('Email template not found'));
  }

  const { email, firstName } = job.data;
  console.log(`📤 Sending test email to ${email} for ${firstName}...`);

  const htmlContent = fs.readFileSync(filePath, 'utf8').replace(/{{firstName}}/g, firstName);

  const mailOptions = {
    from: 'omdey3424@gmail.com',
    to: email,
    subject: 'Test Email from ShopEase Queue!',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully');
    done();
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    done(error);
  }
});

// Events
emailQueue.on('completed', (job) => {
  console.log('🎉 Job completed:', job.id, job.data);
});

emailQueue.on('failed', (job, err) => {
  console.error('🔥 Job failed:', job.id, err);
});

// Add test job
emailQueue.add('sendEmail', {
  email: 'omdey3424@gmail.com',
  firstName: 'Lipik Test',
});

console.log('🚀 Test job added to queue: sendEmail');
