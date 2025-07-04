// All query-related routes and logic
const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
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

// Submit query
router.post('/', authorize(['customer', 'business']), async (req, res) => {
  const { userId, query } = req.body;
  try {
    const newQuery = new Query({ userId, query });
    await newQuery.save();
    res.status(201).json({ message: 'Query submitted' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting query', error });
  }
});

// Get all queries (employee, admin)
router.get('/', authorize(['employee', 'admin']), async (req, res) => {
  try {
    const queries = await Query.find().populate('userId', 'name email');
    res.json(queries);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching queries', error });
  }
});

// Respond to query
router.post('/respond/:queryId', authorize(['employee', 'admin']), async (req, res) => {
  const { queryId } = req.params;
  const { response } = req.body;
  try {
    await Query.findByIdAndUpdate(queryId, { response });
    res.json({ message: 'Response submitted' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting response', error });
  }
});

module.exports = router;
