const express = require('express');
const router = express.Router();
const {
    getActiveServices,
    getServicesByProvider
} = require('../controllers/serviceController');

router.get('/', getActiveServices);
router.get('/:providerId', getServicesByProvider);

module.exports = router;
