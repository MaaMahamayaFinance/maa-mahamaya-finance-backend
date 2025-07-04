const { getAllEmployeesService, createEmployeeIdCardService,fetchEmployeeIdCard } = require("../service/employeeService");
const User = require("../models/User");

const getAllEmployeesController = async (req, res) => {
    try {
        const employees = await getAllEmployeesService();
        res.status(200).json({
            success: true,
            data: employees,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const createEmployeeIdCardController = async (req, res) => {
    try {
        const { name, email, address, pincode, mobileNumber } = req.body;

        if (!name || !email || !address || !pincode || !mobileNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, address, pincode, mobileNumber) are required.",
            });
        }

        const newCard = await createEmployeeIdCardService({
            name,
            email,
            address,
            pincode,
            mobileNumber,
        });

        res.status(201).json({
            success: true,
            message: "Employee ID card created successfully.",
            data: newCard,
        });
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create employee ID card.",
            error: error.message,
        });
    }
};



const getMyEmployeeIdCard = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing in token" });
    }

    // ✅ Fetch user from DB
    const user = await User.findById(userId);
    if (!user || !user.email) {
      return res.status(404).json({ message: "User not found or missing email" });
    }

    // ✅ Use email to get ID card
    const card = await fetchEmployeeIdCard(user.email);

    if (!card) {
      return res.status(404).json({
        success: false,
        pending: true,
        message: "ID card not found for this user"
      });
    }

    res.status(200).json({ success: true, data: card });

  } catch (error) {
    console.error("Error fetching employee ID card:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





module.exports = { createEmployeeIdCardController, getAllEmployeesController, getMyEmployeeIdCard };
