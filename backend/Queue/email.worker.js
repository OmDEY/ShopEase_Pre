// Queue/email.worker.js
const { emailQueue } = require('./emailQueue');
const { sendWelcomeEmail, sendOrderStatusEmail } = require('./email.processor');
const { sendNewsletterEmail } = require('./email.processor');
const { sendContactEmail } = require('./email.processor');

console.log('🚀 Email Worker Started - Listening for "sendEmail" jobs...');

emailQueue.process('sendEmail', async (job, done) => {
    console.log(`📥 Job received: ${job.id}`);
    await sendWelcomeEmail(job, done);
});

emailQueue.process('orderStatusEmail', async (job, done) => {
    console.log(`📥 Job received: ${job.id}`);
    await sendOrderStatusEmail(job, done);
});

emailQueue.process('newsletterEmail', async (job, done) => {
    console.log(`📥 Newsletter job received: ${job.id}`);
    await sendNewsletterEmail(job, done);
});

emailQueue.process('contactEmail', async (job, done) => {
    console.log(`📥 Contact form email job received: ${job.id}`);
    await sendContactEmail(job, done);
});

