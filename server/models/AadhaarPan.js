const mongoose = require('mongoose');

const aadhaarPanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true,
        length: 12
    },
    panNumber: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AadhaarPan', aadhaarPanSchema);
