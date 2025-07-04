// All loan-related routes and logic
const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const jwt = require('jsonwebtoken');

// Middleware for role-based authorization
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

// Apply for loan
router.post('/apply', authorize(['customer', 'business']), async (req, res) => {
  const { userId, amount, purpose } = req.body;
  try {
    const loan = new Loan({ userId, amount, purpose, status: 'pending' });
    await loan.save();
    res.status(201).json({ message: 'Loan application submitted' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application', error });
  }
});

// Get user loans
router.get('/user/:userId', authorize(['customer', 'business', 'employee', 'admin']), async (req, res) => {
  const { userId } = req.params;
  try {
    const loans = await Loan.find({ userId });
    res.json(loans);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching loans', error });
  }
});

// Get all loans (admin)
router.get('/', authorize(['admin']), async (req, res) => {
  try {
    const loans = await Loan.find().populate('userId', 'name email role');
    res.json(loans);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching loans', error });
  }
});

// Get pending loans (employee)
router.get('/pending', authorize(['employee']), async (req, res) => {
  try {
    const loans = await Loan.find({ status: 'pending' }).populate('userId', 'name email role');
    res.json(loans);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching pending loans', error });
  }
});

// Loan decision (approve/reject)
router.post('/:loanId/decision', authorize(['admin', 'employee']), async (req, res) => {
  const { loanId } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    loan.status = status;
    await loan.save();

    res.json({ message: `Loan ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan status', error });
  }
});

module.exports = router;
