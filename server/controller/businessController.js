const {
    createBusinessIdCardService,
    fetchBusinessIdCard,
    getAllBusinessWithStatuses,
    createBusinessCertificateService,
    fetchBusinessCertificate
} = require("../service/businessService");
const User = require("../models/User");

const getAllBusinessController = async (req, res) => {
    try {
        const business = await getAllBusinessWithStatuses();
        res.status(200).json({
        success: true,
        data: business,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};


const createBusinessIdCardController = async (req, res) => {
    try {
        const { profilePhoto, name, email, address, uniqueId, subRole, pincode, mobileNumber } = req.body;

        if (!name || !email || !address || !uniqueId || !subRole || !pincode || !mobileNumber) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, address, role, subRole, pincode, mobileNumber) are required.",
        });
        }

        const newCard = await createBusinessIdCardService({
        profilePhoto,
        name,
        email,
        address,
        uniqueId,
        subRole,
        pincode,
        mobileNumber
        });

        res.status(201).json({
        success: true,
        message: "Business ID card created successfully.",
        data: newCard,
        });
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
        success: false,
        message: "Failed to create Business ID card.",
        error: error.message,
        });
    }
};

const getMyBusinessIdCard = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID missing in token" });
        }

        const user = await User.findById(userId);
        if (!user || !user.email) {
        return res.status(404).json({ message: "Business not found or missing email" });
        }

        const card = await fetchBusinessIdCard(user.email);

        if (!card) {
        return res.status(404).json({
            success: false,
            pending: true,
            message: "ID card not found for this Business"
        });
        }

        res.status(200).json({ success: true, data: card });

    } catch (error) {
        console.error("Error fetching business ID card:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};





const createBusinessCertificateController = async (req, res) => {
    try {
        const { _id, name, uniqueId, email, subRole, date} = req.body;

        if (!_id || !name || !uniqueId || !email || !subRole || !date ) {
        return res.status(400).json({
            success: false,
            message: "All fields (_id, name, email, subRole, uniqueId) are required.",
        });
        }

        const newCert = await createBusinessCertificateService({
        userId: _id,
        name,
        date,
        uniqueId,
        email,
        subRole
        });

        res.status(201).json({
        success: true,
        message: "Authorization Certificate created successfully.",
        data: newCert,
        });
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
        success: false,
        message: "Failed to create certificate.",
        error: error.message,
        });
    }
};







const getMyBusinessCertificate = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID missing in token" });
        }

        const user = await User.findById(userId);
        if (!user || !user.email) {
        return res.status(404).json({ message: "User not found or missing email" });
        }

        const certificate = await fetchBusinessCertificate(user.email);

        if (!certificate) {
        return res.status(404).json({
            success: false,
            pending: true,
            message: "Certificate not found for this user"
        });
        }

        res.status(200).json({ success: true, data: certificate });

    } catch (error) {
        console.error("Error fetching Certificate:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};







module.exports = {
    createBusinessIdCardController,
    getAllBusinessController,
    getMyBusinessIdCard,
    createBusinessCertificateController,
    getMyBusinessCertificate
};
