const { getAllBusiness, createBusinessIdCard, getBusinessIdCardByEmail,getAllBusinessIdCards  } = require("../repository/businessRepository.js");

async function getAllBusinessService() {
    try {
        const business = await getAllBusiness();
        return business;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}




async function createBusinessIdCardService(data) {
    try {
        const card = await createBusinessIdCard(data);
        return card;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}


const fetchBusinessIdCard = async (email) => {
    const card = await getBusinessIdCardByEmail(email);
    if (!card) {
        throw new Error("ID card not found");
    }
    return card;
};


const getAllBusinessWithCardStatus = async () => {
    try {
        const business = await getAllBusiness();
        const idCards = await getAllBusinessIdCards();

        const idCardEmailSet = new Set(idCards.map(card => card.email));

        const enrichedBusiness = business.map(emp => ({
            ...emp._doc,
            isIdCardCreated: idCardEmailSet.has(emp.email),
        }));

        return enrichedBusiness;
    } catch (error) {
        throw new Error("Service Error (card status): " + error.message);
    }
};

module.exports = { createBusinessIdCardService,getAllBusinessService,fetchBusinessIdCard, getAllBusinessWithCardStatus };
