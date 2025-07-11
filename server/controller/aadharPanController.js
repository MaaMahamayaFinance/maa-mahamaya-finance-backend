const {getKYCDetailsByUserIdService} = require('../service/aadharPanService');

const getKYCDetailsController = async (req, res) => {
    try {
        const { userId } = req.params;

        const kyc = await getKYCDetailsByUserIdService(userId);

        if (!kyc) {
            return res.status(200).json({ success: true, data: null, message: "KYC not filled yet" });
        }

        return res.status(200).json({ success: true, data: kyc });
    } catch (error) {
        console.error("Error fetching KYC:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getKYCDetailsController,
};