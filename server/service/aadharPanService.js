const {findKYCByUserId} = require('../repository/aadharPanRepository');

const getKYCDetailsByUserIdService = async (userId) => {
    const kyc = await findKYCByUserId(userId);
    return kyc || null;
};

module.exports = {
    getKYCDetailsByUserIdService,
};