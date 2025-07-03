const express = require('express');
const router = express.Router();
const {
    getServices,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus
} = require('../controllers/serviceController');
const { createService: validateCreateService } = require('../Validations/service.validation');
const authenticateProvider = require('../middlewares/authMiddlewareProvider'); // middleware d’authentification


router.use(authenticateProvider); // protéger toutes les routes services



router.get('/', getServices);
router.post('/', validateCreateService, createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

router.patch('/:id/toggle-status', toggleServiceStatus);


module.exports = router;


