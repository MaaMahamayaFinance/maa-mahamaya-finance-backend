const {
    createBusinessIdCardService,
    fetchBusinessIdCard,
    getAllBusinessWithStatuses,
    createBusinessCertificateService,
    fetchBusinessCertificate,
    getBusinessByUniqueIdService,
    deleteBusinessService,
    submitAadhaarPanDetailsService
} = require("../service/businessService");
const User = require("../models/User");
const { kycSchema } = require('../validators/kycValidator');


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






const searchBusinessByUniqueIdController = async (req, res) => {
    try {
        const { uniqueId } = req.query;

        if (!uniqueId) {
        return res.status(400).json({ error: 'uniqueId is required' });
        }

        const business = await getBusinessByUniqueIdService(uniqueId);

        if (!business) {
        return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const deleteBusinessController = async (req, res) => {
    try {
        const { uniqueId } = req.params;

        const deleted = await deleteBusinessService(uniqueId);

        res.status(200).json({
        message: 'Business deleted successfully',
        intern: deleted,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
        message: error.message || 'Server error while deleting business',
        });
    }
};



const submitAadhaarPanController = async (req, res) => {
    try {

        const parsedData = kycSchema.parse(req.body);

        const result = await submitAadhaarPanDetailsService(parsedData);

        res.status(201).json({
            message: 'Details submitted successfully.',
            data: result
        });
    } catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({
                message: 'Validation failed.',
                errors: err.errors
            });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
    createBusinessIdCardController,
    getAllBusinessController,
    getMyBusinessIdCard,
    createBusinessCertificateController,
    getMyBusinessCertificate,
    searchBusinessByUniqueIdController,
    deleteBusinessController,
    submitAadhaarPanController
};
