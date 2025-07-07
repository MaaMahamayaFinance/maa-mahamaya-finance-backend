const { getAllBusiness, createBusinessIdCard, getBusinessIdCardByEmail, getAllBusinessIdCards, getAllBusinessCertificate, createBusinessCertificate, getBusinessCertificateByEmail  } = require("../repository/businessRepository.js");

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


// const getAllBusinessWithCardStatus = async () => {
//     try {
//         const business = await getAllBusiness();
//         const idCards = await getAllBusinessIdCards();

//         const idCardEmailSet = new Set(idCards.map(card => card.email));

//         const enrichedBusiness = business.map(emp => ({
//             ...emp._doc,
//             isIdCardCreated: idCardEmailSet.has(emp.email),
//         }));

//         return enrichedBusiness;
//     } catch (error) {
//         throw new Error("Service Error (card status): " + error.message);
//     }
// };



async function createBusinessCertificateService(data) {
    try {
        const certificate = await createBusinessCertificate(data);
        return certificate;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}




const fetchBusinessCertificate = async (email) => {
    const card = await getBusinessCertificateByEmail(email);
    if (!card) {
        throw new Error("Certificate not found");
    }
    return card;
};





const getAllBusinessWithStatuses = async () => {
    try {
        const business = await getAllBusiness(); // base data
        const idCards = await getAllBusinessIdCards(); // contains userId
        const certificates = await getAllBusinessCertificate(); // contains userId

        const idCardSet = new Set(idCards.map(card => card.email.toString()));
        const certificateSet = new Set(certificates.map(ol => ol.email.toString()));

        const enrichedBusiness = business.map(buss => ({
        ...buss._doc,
        isIdCardCreated: idCardSet.has(buss.email.toString()),
        isCertificateCreated: certificateSet.has(buss.email.toString())
        }));

        return enrichedBusiness;
    } catch (error) {
        throw new Error("Service Error (status flags): " + error.message);
    }
};





module.exports = { createBusinessIdCardService,getAllBusinessService,fetchBusinessIdCard, createBusinessCertificateService, fetchBusinessCertificate, getAllBusinessWithStatuses };
