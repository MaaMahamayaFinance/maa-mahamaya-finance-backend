// All authentication-related routes and logic
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const OTP = require('../userOtp');
const nodemailer = require('nodemailer');
const Counter = require('../models/Counter');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Maa Mahamaya Finance Registration',
    text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);
}

// Request OTP
router.post('/request-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered. Please login or use a different email.' });
    }
    const existingOtp = await OTP.findOne({ email: email.toLowerCase() });
    if (existingOtp && existingOtp.expiresAt > new Date()) {
      return res.status(400).json({ message: 'OTP already sent. Please check your email.' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.deleteOne({ email: email.toLowerCase() });
    const otpDoc = new OTP({ email: email.toLowerCase(), otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
    await otpDoc.save();
    await sendOtpEmail(email, otp);
    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });
  try {
    const record = await OTP.findOne({ email });
    if (!record) return res.status(400).json({ message: 'OTP not found or expired' });
    if (record.expiresAt < new Date()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ message: 'OTP expired' });
    }
    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    res.json({ message: 'OTP verified' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register
router.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    subRole,
    address,
    pincode,
    mobileNumber,
    otp,
    profilePhoto
  } = req.body;

  if (role === 'admin') {
    return res.status(403).json({ message: 'Registration as admin is not allowed' });
  }

  if (!name || !email || !password || !role || !subRole || !address || !pincode || !mobileNumber || !otp || !profilePhoto) {
    return res.status(400).json({ message: 'All fields including OTP are required' });
  }

  try {
    const record = await OTP.findOne({ email });
    if (!record) return res.status(400).json({ message: 'OTP not found or expired' });

    if (record.expiresAt < new Date()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    await OTP.deleteOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate role prefix
    let prefix = '';
    if (role === 'customer') prefix = 'CUS';
    else if (role === 'employee') prefix = 'EMP';
    else if (role === 'intern') prefix = 'INT';
    else if (role === 'business') prefix = 'BUS';
    else return res.status(400).json({ message: 'Invalid role for ID generation' });

    // ✅ Find or create and increment counter for role
    const counter = await Counter.findOneAndUpdate(
      { role },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    // ✅ Generate uniqueId
    const uniqueId = `${prefix}${String(counter.count).padStart(4, '0')}`;

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      subRole,
      address,
      pincode,
      mobileNumber,
      profilePhoto: profilePhoto || '',
      uniqueId, // ✅ Add to user
    };

    const user = new User(userData);
    const savedUser = await user.save();

    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role, subRole: savedUser.subRole },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        uniqueId: savedUser.uniqueId, // ✅ Return it
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        subRole: savedUser.subRole,
        address: savedUser.address,
        pincode: savedUser.pincode,
        mobileNumber: savedUser.mobileNumber,
        profilePhoto: savedUser.profilePhoto
      }
    });

  } catch (error) {
    console.error('Error saving user:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }

    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
