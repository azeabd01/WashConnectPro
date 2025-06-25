const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');

// Route: GET all users
router.get('/users', getAllUsers);

// Route: GET all pending providers
// router.get('/providers/pending', adminController.getPendingProviders);

// // Route: PATCH approve provider
// router.patch('/providers/approve/:id', adminController.approveProvider);

// Route: GET dashboard stats
// router.get('/stats', adminController.getDashboardStats);

module.exports = router;
