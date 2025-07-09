const { getAllInterns, createInternIdCard, getInternIdCardByEmail, getAllInternIdCards, createInternOfferLetter, getInternOfferLetterByEmail, getAllInternOfferLetter, createInternCertificate, getInternCertificateByEmail, getAllInternCertificate, findInternByUniqueId, deleteInternById } = require("../repository/internRepository.js")



async function getAllInternsService() {
    try {
        const interns = await getAllInterns();
        return interns;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}



async function createInternIdCardService(data) {
    try {
        const card = await createInternIdCard(data);
        return card;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}


const fetchInternIdCard = async (email) => {
    const card = await getInternIdCardByEmail(email);
    if (!card) {
        throw new Error("ID card not found");
    }
    return card;
};



async function createInternOfferLetterService(data) {
    try {
        const card = await createInternOfferLetter(data);
        return card;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}




const fetchInternOfferLetter = async (email) => {
    const card = await getInternOfferLetterByEmail(email);
    if (!card) {
        throw new Error("Offer Letter not found");
    }
    return card;
};






async function createInternCertificateService(data) {
    try {
        const certificate = await createInternCertificate(data);
        return certificate;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}




const fetchInternCertificate = async (email) => {
    const card = await getInternCertificateByEmail(email);
    if (!card) {
        throw new Error("Certificate not found");
    }
    return card;
};







const getAllInternWithStatuses = async () => {
    try {
        const interns = await getAllInterns(); // base data
        const idCards = await getAllInternIdCards(); // contains userId
        const offerLetters = await getAllInternOfferLetter(); // contains userId
        const certificates = await getAllInternCertificate();

        const idCardSet = new Set(idCards.map(card => card.email.toString()));
        const offerLetterSet = new Set(offerLetters.map(ol => ol.email.toString()));
        const certificateSet = new Set(certificates.map(ol => ol.email.toString()));

        const enrichedInterns = interns.map(emp => ({
        ...emp._doc,
        isIdCardCreated: idCardSet.has(emp.email.toString()),
        isOfferLetterCreated: offerLetterSet.has(emp.email.toString()),
        isCertificateCreated: certificateSet.has(emp.email.toString())
        }));

        return enrichedInterns;
    } catch (error) {
        throw new Error("Service Error (status flags): " + error.message);
    }
};




const getInternByUniqueIdService = async (uniqueId) => {
    return await findInternByUniqueId(uniqueId);
};




const deleteInternService = async (uniqueId) => {
    const deletedIntern = await deleteInternById(uniqueId);

    if (!deletedIntern) {
        const error = new Error('Intern not found or already deleted');
        error.statusCode = 404;
        throw error;
    }

    return deletedIntern;
};






module.exports = { getAllInternsService, createInternIdCardService, fetchInternIdCard, createInternOfferLetterService, fetchInternOfferLetter, createInternCertificateService, fetchInternCertificate, getAllInternWithStatuses, getInternByUniqueIdService, deleteInternService }