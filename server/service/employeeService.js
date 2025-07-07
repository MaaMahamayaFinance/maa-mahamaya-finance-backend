const { getAllEmployees, getEmployeeOfferLetterByEmail, getAllEmployeeOfferLetter } = require("../repository/employeeRepository.js");
const { createEmployeeIdCard, getEmployeeIdCardByEmail,getAllEmployeeIdCards, createEmployeeOfferLetter } = require("../repository/employeeRepository.js");

async function getAllEmployeesService() {
    try {
        const employees = await getAllEmployees();
        return employees;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}




async function createEmployeeIdCardService(data) {
    try {
        const card = await createEmployeeIdCard(data);
        return card;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}


const fetchEmployeeIdCard = async (email) => {
    const card = await getEmployeeIdCardByEmail(email);
    if (!card) {
        throw new Error("ID card not found");
    }
    return card;
};


const getAllEmployeesWithCardStatus = async () => {
    try {
        const employees = await getAllEmployees();
        const idCards = await getAllEmployeeIdCards();

        const idCardEmailSet = new Set(idCards.map(card => card.email));

        const enrichedEmployees = employees.map(emp => ({
            ...emp._doc,
            isIdCardCreated: idCardEmailSet.has(emp.email),
        }));

        return enrichedEmployees;
    } catch (error) {
        throw new Error("Service Error (card status): " + error.message);
    }
};

// Offer letter apis

async function createEmployeeOfferLetterService(data) {
    try {
        const card = await createEmployeeOfferLetter(data);
        return card;
    } catch (error) {
        throw new Error("Service Error: " + error.message);
    }
}




const fetchEmployeeOfferLetter = async (email) => {
    const card = await getEmployeeOfferLetterByEmail(email);
    if (!card) {
        throw new Error("Offer Letter not found");
    }
    return card;
};


// const getAllEmployeesWithOfferLetterStatus = async () => {
//     try {
//         const employees = await getAllEmployees();
//         const offerLetter = await getAllEmployeeOfferLetter();

//         const isOfferEmailSet = new Set(offerLetter.map(ol => ol.email));

//         const enrichedEmployees = employees.map(emp => ({
//             ...emp._doc,
//             isOLCardCreated: isOfferEmailSet.has(emp.email),
//         }));

//         return enrichedEmployees;
//     } catch (error) {
//         throw new Error("Service Error (card status): " + error.message);
//     }
// };



module.exports = { createEmployeeIdCardService,getAllEmployeesService,fetchEmployeeIdCard, getAllEmployeesWithCardStatus, createEmployeeOfferLetterService, fetchEmployeeOfferLetter };
