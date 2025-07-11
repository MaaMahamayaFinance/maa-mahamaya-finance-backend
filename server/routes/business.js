const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticate");
const { getAllBusinessController,createBusinessIdCardController, getMyBusinessIdCard, createBusinessCertificateController, getMyBusinessCertificate, searchBusinessByUniqueIdController, deleteBusinessController, submitAadhaarPanController } = require("../controller/businessController");



router.get("/getallbusiness", getAllBusinessController);
router.post("/createbusinessidcard", createBusinessIdCardController);
router.get("/businessidcard/me", authenticateUser, getMyBusinessIdCard);
router.post("/createbusinesscertificate", createBusinessCertificateController);
router.get("/authorizationcertificate/me", authenticateUser, getMyBusinessCertificate);
router.get('/searchbusiness', searchBusinessByUniqueIdController);
router.delete('/business/:uniqueId', deleteBusinessController);
router.post('/business/kyc', submitAadhaarPanController);


module.exports = router;
