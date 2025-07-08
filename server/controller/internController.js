const { getAllInternsService, createInternIdCardService, fetchInternIdCard, createInternOfferLetterService, fetchInternOfferLetter, createInternCertificateService, fetchInternCertificate, getAllInternWithStatuses } = require("../service/internService");
const User = require("../models/User");


const getAllInternsController = async (req, res) => {
    try {
        const interns = await getAllInternWithStatuses();
        res.status(200).json({
        success: true,
        data: interns,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};



const createInternIdCardController = async (req, res) => {
    try {
        const { profilePhoto, name, email, address, uniqueId, subRole, pincode, mobileNumber } = req.body;

        if (!name || !email || !address || !uniqueId || !subRole || !pincode || !mobileNumber) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, address, uniqueId, subRole, pincode, mobileNumber) are required.",
        });
        }

        const newCard = await createInternIdCardService({
        profilePhoto,
        name,
        email,
        address,
        uniqueId,
        subRole,
        pincode,
        mobileNumber,
        });

        res.status(201).json({
        success: true,
        message: "Intern ID card created successfully.",
        data: newCard,
        });
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
        success: false,
        message: "Failed to create intern ID card.",
        error: error.message,
        });
    }
};



const getMyInternIdCard = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID missing in token" });
        }

        const user = await User.findById(userId);
        if (!user || !user.email) {
        return res.status(404).json({ message: "User not found or missing email" });
        }

        const card = await fetchInternIdCard(user.email);

        if (!card) {
        return res.status(404).json({
            success: false,
            pending: true,
            message: "ID card not found for this user"
        });
        }

        res.status(200).json({ success: true, data: card });

    } catch (error) {
        console.error("Error fetching intern ID card:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};




const createInternOfferLetterController = async (req, res) => {
    try {
        const { _id, name, uniqueId, email, address, subRole, pincode, ctc, joiningDate } = req.body;

        if (!_id || !name || !uniqueId || !email || !address || !subRole || !pincode || !ctc || !joiningDate ) {
        return res.status(400).json({
            success: false,
            message: "All fields (_id, name, email, address, subRole, pincode, ctc, joiningDate) are required.",
        });
        }

        const newOL = await createInternOfferLetterService({
        userId: _id,
        name,
        uniqueId,
        email,
        address,
        subRole,
        pincode,
        ctc,
        joiningDate
        });

        res.status(201).json({
        success: true,
        message: "Intern Offer Letter created successfully.",
        data: newOL,
        });
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
        success: false,
        message: "Failed to create intern Offer Letter.",
        error: error.message,
        });
    }
};




const getMyInternOfferLetter = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID missing in token" });
        }

        const user = await User.findById(userId);
        if (!user || !user.email) {
        return res.status(404).json({ message: "User not found or missing email" });
        }

        const card = await fetchInternOfferLetter(user.email);

        if (!card) {
        return res.status(404).json({
            success: false,
            pending: true,
            message: "Offer Letter not found for this user"
        });
        }

        res.status(200).json({ success: true, data: card });

    } catch (error) {
        console.error("Error fetching Intern Offer Letter:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};




const createInternCertificateController = async (req, res) => {
    try {
        const { _id, name, uniqueId, email, subRole, date} = req.body;

        if (!_id || !name || !uniqueId || !email || !subRole || !date ) {
        return res.status(400).json({
            success: false,
            message: "All fields (_id, name, email, subRole, uniqueId) are required.",
        });
        }

        const newCert = await createInternCertificateService({
        userId: _id,
        name,
        date,
        uniqueId,
        email,
        subRole
        });

        res.status(201).json({
        success: true,
        message: "Certificate created successfully.",
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




const getMyInternCertificate = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID missing in token" });
        }

        const user = await User.findById(userId);
        if (!user || !user.email) {
        return res.status(404).json({ message: "User not found or missing email" });
        }

        const certificate = await fetchInternCertificate(user.email);

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
    createInternIdCardController,
    getAllInternsController,
    getMyInternIdCard,
    createInternOfferLetterController,
    getMyInternOfferLetter,
    createInternCertificateController,
    getMyInternCertificate
};