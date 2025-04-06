// Queue/email.queue.js
const Queue = require('bull');
require('dotenv').config();

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
    }
};
