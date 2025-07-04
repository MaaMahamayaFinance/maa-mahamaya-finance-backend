const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  query: { type: String, required: true },
  response: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Query', querySchema);
