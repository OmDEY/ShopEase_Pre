const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: function() { return this.role === 'user'; }, 
  },
  lastName: {
    type: String,
    default: '',
  },
  fullName: {
    type: String,
    required: function() { return this.role !== 'user'; }, // Required only for Admin
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: function() { return this.role !== 'user'; }, // Required only for Admin
    unique: function() { return this.role !== 'user'; }, // Ensure unique username for admins
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: function() { return this.role !== 'user'; }, // Required only for Admin
    unique: function() { return this.role !== 'user'; },
    match: [/^\d{10,15}$/, 'Invalid phone number format'],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'Super Admin', 'Moderator'],
    default: 'user',
  },
  securityQuestion: {
    type: String,
    required: function() { return this.role !== 'user'; }, // Required only for Admin
  },
  securityAnswer: {
    type: String,
    required: function() { return this.role !== 'user'; }, // Required only for Admin
  },
  companyName: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  agreeToTerms: {
    type: Boolean,
    required: function() { return this.role !== 'user'; }, // Required only for Admin
  },
  shippingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  billingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }
  ],
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      }
    }
  ],
  orderHistory: [
    {
      orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
      orderDate: Date,
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

// 🔒 Hash password and security answer before saving
userSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('User', userSchema);
