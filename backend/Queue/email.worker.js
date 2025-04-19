// Queue/email.worker.js
const { emailQueue } = require('./emailQueue');
const { sendWelcomeEmail, sendOrderStatusEmail } = require('./email.processor');

console.log('🚀 Email Worker Started - Listening for "sendEmail" jobs...');

emailQueue.process('sendEmail', async (job, done) => {
    console.log(`📥 Job received: ${job.id}`);
    await sendWelcomeEmail(job, done);
});

emailQueue.process('orderStatusEmail', async (job, done) => {
    console.log(`📥 Job received: ${job.id}`);
    await sendOrderStatusEmail(job, done);
});