const mongoose = require("mongoose");

const employeeIdCardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("EmployeeIdCard", employeeIdCardSchema);
