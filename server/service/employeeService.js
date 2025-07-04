const { getAllEmployees } = require("../repository/employeeRepository.js");
const { createEmployeeIdCard, getEmployeeIdCardByEmail } = require("../repository/employeeRepository.js");

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

module.exports = { createEmployeeIdCardService,getAllEmployeesService,fetchEmployeeIdCard };
