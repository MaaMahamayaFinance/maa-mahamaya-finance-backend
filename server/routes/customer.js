const express = require('express');
const router = express.Router();
const { getMatchingBusinessesController, submitAadhaarPanController } = require('../controller/customerController');
const { getKYCDetailsController } = require('../controller/aadharPanController');

router.get('/match-businesses/:userId', getMatchingBusinessesController);
router.post('/customer/kyc', submitAadhaarPanController);
router.get('/customer/getkyc/:userId', getKYCDetailsController);

module.exports = router;