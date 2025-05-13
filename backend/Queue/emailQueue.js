// Queue/email.queue.js
const Queue = require('bull');
require('dotenv').config();
const { sendOrderStatusEmail } = require('./email.processor');

const emailQueue = new Queue('email', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME,
    },
});

console.log('📦 Email queue initialized');

emailQueue.on('error', (err) => {
    console.error('🚨 Error in email queue:', err);
});

emailQueue.on('completed', (job) => {
    console.log('✅ Email job completed:', job.id, job.data);
});

emailQueue.on('failed', (job, err) => {
    console.error('❌ Email job failed:', job.id, err.message);
});

// Export to add jobs from anywhere
module.exports = {
    emailQueue,
    addWelcomeEmail: (email, firstName) => {
        console.log(`📤 Adding email job to queue for: ${email}`);
        emailQueue.add('sendEmail', { email, firstName });
    },
    addOrderStatusEmail: (data) => {
        console.log(`📤 Queueing order status email for: ${data.email}`);
        emailQueue.add('orderStatusEmail', data);
    },
    // Add this export inside module.exports in email.queue.js
    addNewsletterEmail: ({ email, firstName, subject, content }) => {
        console.log(`📤 Queueing newsletter email to: ${email}`);
        emailQueue.add('newsletterEmail', { email, firstName, subject, content });
    },
    addContactEmail: ({ name, email, subject, message }) => {
        console.log(`📤 Queueing contact form email from: ${email}`);
        emailQueue.add('contactEmail', { name, email, subject, message });
    }    
};
