const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticate");

const { getAllEmployeesController,createEmployeeIdCardController, getMyEmployeeIdCard } = require("../controller/employeeController");

router.get("/getallemployees", getAllEmployeesController);
router.post("/createemployeeidcard", createEmployeeIdCardController);
router.get("/employeeidcard/me", authenticateUser, getMyEmployeeIdCard);

module.exports = router;
