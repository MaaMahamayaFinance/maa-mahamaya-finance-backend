const AadhaarPan = require('../models/AadhaarPan');
const User = require('../models/User');


const getUserById = async (userId) => {
    return await User.findById(userId).select('pincode');
};

const getBusinessesByPincode = async (pincode, page = 1, limit = 5) => {
    const skip = (page - 1) * limit;

    const [businesses, total] = await Promise.all([
        User.find({ role: 'business', pincode })
        .select('name email address pincode mobileNumber profilePhoto')
        .skip(skip)
        .limit(limit),
        User.countDocuments({ role: 'business', pincode })
    ]);

    return { businesses, total };
    };


    const createAadhaarPan = async (data) => {
        return await AadhaarPan.create(data);
    };
    
    const findAadhaarPanByUserId = async (userId) => {
        return await AadhaarPan.findOne({ userId });
    };
    

    module.exports = {
    getUserById,
    getBusinessesByPincode,
    createAadhaarPan,
    findAadhaarPanByUserId
};
