const { getBusinessesByPincode, getUserById, findAadhaarPanByUserId, createAadhaarPan } = require('../repository/customerRepository');

const findMatchingBusinessesService = async (userId, page, limit) => {
    const user = await getUserById(userId);
    if (!user) throw new Error('User not found');

    const { businesses, total } = await getBusinessesByPincode(user.pincode, page, limit);

    return {
        businesses,
        total,
        totalPages: Math.ceil(total / limit),
        page
    };
};



const submitAadhaarPanDetailsService = async (data) => {
    const existing = await findAadhaarPanByUserId(data.userId);
    if (existing) {
        throw new Error('Aadhaar and PAN details already submitted.');
    }
    return await createAadhaarPan(data);
};



module.exports = {
    findMatchingBusinessesService,
    submitAadhaarPanDetailsService
};
