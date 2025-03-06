const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const AdminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10,15}$/, 'Invalid phone number format']
    },    
    role: {
        type: String,
        required: true,
        enum: ['Super Admin', 'Admin', 'Moderator'],
        default: 'Admin'
    },
    securityQuestion: {
        type: String,
        required: true
    },
    securityAnswer: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    captchaResponse: {
        type: String
    },
    agreeToTerms: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password') && !this.isModified('securityAnswer')) return next();

    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.isModified('securityAnswer')) {
        this.securityAnswer = await bcrypt.hash(this.securityAnswer, 10);
    }

    next();
});


module.exports = mongoose.model('Admin', AdminSchema);
