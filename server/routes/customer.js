const express = require('express');
const router = express.Router();
const { getMatchingBusinessesController } = require('../controller/customerController');

router.get('/match-businesses/:userId', getMatchingBusinessesController);

module.exports = router;