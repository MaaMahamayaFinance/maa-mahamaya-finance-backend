const express = require('express');
const router = express.Router();
const { generateUploadURL } = require('../controller/preSignedUrlGeneratorController');

router.get('/get-upload-url', generateUploadURL);

module.exports = router;