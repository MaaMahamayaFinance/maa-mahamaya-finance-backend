const express = require('express');
const router = express.Router();
const { getMatchingBusinessesController, submitAadhaarPanController } = require('../controller/customerController');

router.get('/match-businesses/:userId', getMatchingBusinessesController);
router.post('/customer/kyc', submitAadhaarPanController);

module.exports = router;