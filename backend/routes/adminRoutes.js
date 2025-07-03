const express             = require('express');
const { getAdminStats }   = require('../controllers/adminController');
const router              = express.Router();

// GET /api/admin/stats
router.get('/stats', getAdminStats);

module.exports = router;
