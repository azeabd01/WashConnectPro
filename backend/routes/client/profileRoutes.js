const express = require('express');
const router = express.Router();
const authClient = require('../../middlewares/authClientMiddleware');
const { getProfile, updateProfile } = require('../../controllers/client/profileController');

router.get('/', authClient, getProfile);
router.put('/', authClient, updateProfile);

module.exports = router;
