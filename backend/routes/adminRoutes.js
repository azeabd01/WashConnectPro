const express = require('express');
const { getAdminStats }   = require('../controllers/adminController');
const router = express.Router();

// GET /api/admin/stats
router.get('/stats', getAdminStats);
// router.get('/allProviders', getAllProviders); 

module.exports = router;
