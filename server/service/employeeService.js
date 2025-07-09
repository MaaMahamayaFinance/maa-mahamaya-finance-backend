const { getAllEmployees, getEmployeeOfferLetterByEmail, getAllEmployeeOfferLetter } = require("../repository/employeeRepository.js");
const { createEmployeeIdCard, getEmployeeIdCardByEmail,getAllEmployeeIdCards, createEmployeeOfferLetter, findEmployeeByUniqueId, deleteEmployeeById } = require("../repository/employeeRepository.js");

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


// const getAllEmployeesWithCardStatus = async () => {
//     try {
//         const employees = await getAllEmployees();
//         const idCards = await getAllEmployeeIdCards();

//         const idCardEmailSet = new Set(idCards.map(card => card.email));

//         const enrichedEmployees = employees.map(emp => ({
//             ...emp._doc,
//             isIdCardCreated: idCardEmailSet.has(emp.email),
//         }));

//         return enrichedEmployees;
//     } catch (error) {
//         throw new Error("Service Error (card status): " + error.message);
//     }
// };

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




const getAllEmployeesWithStatuses = async () => {
    try {
        const employees = await getAllEmployees(); // base data
        const idCards = await getAllEmployeeIdCards(); // contains userId
        const offerLetters = await getAllEmployeeOfferLetter(); // contains userId

        const idCardSet = new Set(idCards.map(card => card.email.toString()));
        const offerLetterSet = new Set(offerLetters.map(ol => ol.email.toString()));

        const enrichedEmployees = employees.map(emp => ({
        ...emp._doc,
        isIdCardCreated: idCardSet.has(emp.email.toString()),
        isOfferLetterCreated: offerLetterSet.has(emp.email.toString())
        }));

        return enrichedEmployees;
    } catch (error) {
        throw new Error("Service Error (status flags): " + error.message);
    }
};





const getEmployeeByUniqueIdService = async (uniqueId) => {
    return await findEmployeeByUniqueId(uniqueId);
};




const deleteEmployeeService = async (uniqueId) => {
    const deletedEmployee = await deleteEmployeeById(uniqueId);

    if (!deletedEmployee) {
        const error = new Error('Employee not found or already deleted');
        error.statusCode = 404;
        throw error;
    }

    return deletedEmployee;
};





module.exports = { createEmployeeIdCardService,getAllEmployeesService,fetchEmployeeIdCard, createEmployeeOfferLetterService, fetchEmployeeOfferLetter, getAllEmployeesWithStatuses, getEmployeeByUniqueIdService, deleteEmployeeService };
