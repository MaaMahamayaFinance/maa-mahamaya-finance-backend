const AadhaarPan = require('../models/AadhaarPan');

const findKYCByUserId = async (userId) => {
    return await AadhaarPan.findOne({ userId });
};

module.exports = {
    findKYCByUserId,
};