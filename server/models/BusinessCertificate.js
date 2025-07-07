const mongoose = require('mongoose');

const businessCertificateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        unique: true
    },
    subRole: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
});


module.exports = mongoose.model('BusinessCertificate', businessCertificateSchema);
