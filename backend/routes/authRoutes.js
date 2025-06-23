const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { allowRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Exemple route protégée admin uniquement
router.get('/admin/dashboard', authMiddleware, allowRoles('admin'), (req, res) => {
    res.json({ message: 'Bienvenue dans le dashboard admin!' });
});

module.exports = router;
