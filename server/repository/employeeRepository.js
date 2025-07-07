const User = require("../models/User");
const EmployeeIdCard = require("../models/EmployeeIdCard");

async function getAllEmployees() {
    try {
        const employees = await User.find(
            { role: "employee" },
            "_id name email subRole address pincode mobileNumber profilePhoto uniqueId"
        );
        return employees;
    } catch (error) {
        console.error("Error in repository:", error);
        throw error;
    }
}



async function createEmployeeIdCard(data) {
    try {
        const card = new EmployeeIdCard(data);
        return await card.save();
    } catch (error) {
        console.error("Error creating Employee ID card:", error);
        throw error;
    }
}

const getEmployeeIdCardByEmail = async (email) => {
    return await EmployeeIdCard.findOne({ email });
};

const getAllEmployeeIdCards = async () => {
    try {
        return await EmployeeIdCard.find({}, "email");
    } catch (error) {
        console.error("Error fetching all ID cards:", error);
        throw error;
    }
};



module.exports = { createEmployeeIdCard, getAllEmployees,getEmployeeIdCardByEmail, getAllEmployeeIdCards };