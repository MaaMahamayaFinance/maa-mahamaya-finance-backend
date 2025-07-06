const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name must be at most 50 characters long'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    maxlength: [128, 'Password must be at most 128 characters long'],
  },
  role: {
    type: String,
    enum: {
      values: ['customer', 'business', 'employee', 'admin'],
      message: 'Role must be customer, business, employee, or admin',
    },
    required: [true, 'Role is required'],
  },
  subRole: {
    type: String,
    enum: {
      values: [
        'softwareDeveloper',
        'hr',
        'sales',
        'marketing',
        'finance',
        'retail',
        'manufacturing',
        'services',
        'technology',
        'healthcare',
      ],
      message: 'Invalid subRole',
    },
    required: function () {
      return this.role === 'employee' || this.role === 'business';
    },
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [2, 'Address must be at least 5 characters'],
    maxlength: [255, 'Address must be at most 255 characters'],
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    match: [/^\d{6}$/, 'Pincode must be a 6-digit number'],
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^\d{12}$/, 'Mobile number must be a 10-digit number without country code'],
  },

  // ✅ NEW FIELD for S3 image URL
  profilePhoto: {
    type: String,
    default: '', // optional – can be empty initially
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
