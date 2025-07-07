const mongoose = require('mongoose');

const offerLetterSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    uniqueId: {
        type: String,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    subRole: {
        type: String,
        required: true
    },
    ctc: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
});


module.exports = mongoose.model('OfferLetter', offerLetterSchema);
