const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticate");

const { getAllBusinessController,createBusinessIdCardController, getMyBusinessIdCard } = require("../controller/businessController");

router.get("/getallbusiness", getAllBusinessController);
router.post("/createbusinessidcard", createBusinessIdCardController);
router.get("/businessidcard/me", authenticateUser, getMyBusinessIdCard);

module.exports = router;
