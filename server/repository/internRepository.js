const User = require("../models/User");
const InternIdCard = require("../models/InternIdCard");
const InternOfferLetter = require("../models/InternOfferLetter");
const InternCertificate = require("../models/InternCertificate");

async function getAllInterns() {
    try {
        const intern = await User.find(
            { role: "intern" },
            "_id name email subRole address pincode mobileNumber profilePhoto uniqueId"
        );
        return intern;
    } catch (error) {
        console.error("Error in repository:", error);
        throw error;
    }
}



async function createInternIdCard(data) {
    try {
        const card = new InternIdCard(data);
        return await card.save();
    } catch (error) {
        console.error("Error creating Intern ID card:", error);
        throw error;
    }
}



const getInternIdCardByEmail = async (email) => {
    return await InternIdCard.findOne({ email });
};

const getAllInternIdCards = async () => {
    try {
        return await InternIdCard.find({}, "email");
    } catch (error) {
        console.error("Error fetching all ID cards:", error);
        throw error;
    }
};




async function createInternOfferLetter(data) {
    try {
        const offerLetter = new InternOfferLetter(data);
        return await offerLetter.save();
    } catch (error) {
        console.error("Error creating Intern Offer Letter:", error);
        throw error;
    }
}



const getInternOfferLetterByEmail = async (email) => {
    return await InternOfferLetter.findOne({ email });
};

const getAllInternOfferLetter = async () => {
    try {
        return await InternOfferLetter.find({}, "email");
    } catch (error) {
        console.error("Error fetching all Offer Letter:", error);
        throw error;
    }
};




async function createInternCertificate(data) {
    try {
        const certificate = new InternCertificate(data);
        return await certificate.save();
    } catch (error) {
        console.error("Error creating Intern Certificate:", error);
        throw error;
    }
}



const getInternCertificateByEmail = async (email) => {
    return await InternCertificate.findOne({ email });
};

const getAllInternCertificate = async () => {
    try {
        return await InternCertificate.find({}, "email");
    } catch (error) {
        console.error("Error fetching all Intern Certificate:", error);
        throw error;
    }
};



const findInternByUniqueId = async (uniqueId) => {
    return await User.findOne({ role: 'intern', uniqueId });
};




const deleteInternById = async (uniqueId) => {
    const deletedIntern = await User.findOneAndDelete({ role: 'intern', uniqueId });

    if (!deletedIntern) return null;

    await InternIdCard.deleteOne({ uniqueId });
    await InternOfferLetter.deleteOne({ uniqueId });
    await InternCertificate.deleteOne({ uniqueId });

    return deletedIntern;

};



module.exports = { getAllInterns, createInternIdCard, getInternIdCardByEmail, getAllInternIdCards, createInternOfferLetter, getInternOfferLetterByEmail, getAllInternOfferLetter, createInternCertificate, getInternCertificateByEmail, getAllInternCertificate, findInternByUniqueId, deleteInternById }