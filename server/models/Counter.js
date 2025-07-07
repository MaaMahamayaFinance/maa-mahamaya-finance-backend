const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true,
        enum: ['customer', 'employee', 'business'],
    },
    count: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Counter', counterSchema);
