const User = require("../models/User");
const BusinessIdCard = require("../models/BusinessIdCard");

async function getAllBusiness() {
    try {
        const business = await User.find(
            { role: "business" },
            "_id name email subRole address pincode mobileNumber profilePhoto uniqueId"
        );
        return business;
    } catch (error) {
        console.error("Error in repository:", error);
        throw error;
    }
}



async function createBusinessIdCard(data) {
    try {
        const card = new BusinessIdCard(data);
        return await card.save();
    } catch (error) {
        console.error("Error creating Employee ID card:", error);
        throw error;
    }
}

const getBusinessIdCardByEmail = async (email) => {
    return await BusinessIdCard.findOne({ email });
};

const getAllBusinessIdCards = async () => {
    try {
        return await BusinessIdCard.find({}, "email");
    } catch (error) {
        console.error("Error fetching all ID cards:", error);
        throw error;
    }
};



module.exports = { createBusinessIdCard, getAllBusiness, getBusinessIdCardByEmail, getAllBusinessIdCards };