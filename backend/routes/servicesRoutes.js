const express = require('express');
const auth = require('../middlewares/authMiddleware');
const serviceValidation = require('../validations/service.validation');

const {
    getServices, 
    createService, 
    updateService, 
    deleteService
} = require('../controllers/serviceController');

const router = express.Router();

router.get('/', auth , getServices);
router.post('/', auth, serviceValidation.createService, createService);
router.put('/:id', auth, updateService);
router.delete('/:id',auth, deleteService);

module.exports = router;


