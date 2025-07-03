const express = require('express');
const router = express.Router();
const { searchProviders } = require('../../controllers/client/searchProviderController');

router.get('/providers/search', searchProviders);

module.exports = router;
