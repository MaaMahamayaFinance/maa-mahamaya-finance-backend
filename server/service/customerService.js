const { getBusinessesByPincode, getUserById } = require('../repository/customerRepository');

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

    module.exports = {
    findMatchingBusinessesService,
};
