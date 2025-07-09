const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticate");

const {
    createInternIdCardController,
    getAllInternsController,
    getMyInternIdCard,
    createInternOfferLetterController,
    getMyInternOfferLetter,
    createInternCertificateController,
    getMyInternCertificate,
    searchInternByUniqueIdController,
    deleteInternController
} = require("../controller/internController");

router.get("/getallinterns", getAllInternsController);
router.post("/createinternidcard", createInternIdCardController);
router.get("/internidcard/me", authenticateUser, getMyInternIdCard);
router.post("/createinternofferletter", createInternOfferLetterController);
router.get("/internofferletter/me", authenticateUser, getMyInternOfferLetter);
router.post("/createinterncertificate", createInternCertificateController);
router.get("/interncertificate/me", authenticateUser, getMyInternCertificate);
router.get('/searchintern', searchInternByUniqueIdController);
router.delete('/interns/:uniqueId', deleteInternController);

module.exports = router;
