const express = require('express');
const auth = require('../middlewares/authMiddleware');
const {
    getAllServices, createService, updateService, deleteService
} = require('../controllers/serviceController');

const router = express.Router();

router.get('/', auth , getAllServices);
router.post('/', auth, createService);
router.put('/:id', auth, updateService);
router.delete('/:id',auth, deleteService);

module.exports = router;


