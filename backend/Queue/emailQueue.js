const Queue = require('bull');
const nodemailer = require('nodemailer');
const path = require('path');

// Create a new queue instance
const emailQueue = new Queue('email', {
    redis: { host: '127.0.0.1', port: 6379 },
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'omdey3424@gmail.com',
        pass: 'evas lfdg birz rdqd', // Use environment variables for security
    },
});


// Process the email queue
emailQueue.process(async (job, done) => {
    const filePath = path.join(__dirname, '../templates', 'welcomeEmail.html');
    const fileExists = require('fs').existsSync(filePath);
    if (!fileExists) {
        throw new Error(`File not found: ${filePath}`);
    }

    const { email, firstName } = job.data;

    console.log(`Sending email to ${email} with name ${firstName}`);

    const mailOptions = {
        from: 'omdey3424@gmail.com',
        to: email,
        subject: 'Welcome to ShopEase!',
        html: require('fs').readFileSync(filePath, 'utf8').replace(/{{firstName}}/g, firstName),
    };

    try {
        // Send the email
        transporter.sendMail(mailOptions)
            .then(() => {
                console.log('Email sent successfully');
                done(); // Notify Bull that the job is done
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                done(new Error('Failed to send email: ' + error.message));
            });
    } catch (error) {
        done(new Error('Failed to send email: ' + error.message));
    }
});

module.exports = emailQueue;
