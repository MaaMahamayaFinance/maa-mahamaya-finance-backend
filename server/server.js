require('dotenv').config();
const express = require('express');
const  User  = require('./models/User.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const nodemailer = require('nodemailer');

const authRoutes = require('./routes/auth');
const loanRoutes = require('./routes/loans');
const transactionRoutes = require('./routes/transactions');
const queryRoutes = require('./routes/queries');
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee.js');
const businessRoutes = require('./routes/business.js');
const uploadRoutes = require('./routes/uploadRoutes.js');

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Root route added for Render testing
app.get('/', (req, res) => {
  res.send('✅ Maa Mahamaya Finance backend is running!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB database');

  // Check if admin user exists, if not create it
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  try {
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const adminUser = new User({
        name: 'Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        address: 'N/A',
        pincode: 'N/A',
        mobileNumber: 'N/A',
      });
      await adminUser.save();
      console.log('Admin user created with fixed credentials');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api', adminRoutes);
app.use('/api', employeeRoutes);
app.use('/api', businessRoutes);
app.use('/api', uploadRoutes); 

// ✅ Server start (Render-compatible)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
