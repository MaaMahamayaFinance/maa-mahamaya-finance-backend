// All transaction-related routes and logic
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const authorize = (roles) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin' && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user transactions
router.get('/user/:userId', authorize(['customer', 'business', 'admin']), async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transactions', error });
  }
});

// Get all transactions (admin)
router.get('/', authorize(['admin']), async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId', 'name email role');
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transactions', error });
  }
});

module.exports = router;
