const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Bloquer la création de compte admin depuis l’API publique
        if (role === 'admin') {
            return res.status(403).json({ message: 'Création d’un compte admin non autorisée.' });
        }

        // Vérifier que role est valide
        if (!['produit', 'prestataire', 'client'].includes(role)) {
            return res.status(400).json({ message: 'Role invalide' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Utilisateur déjà existant' });

        // Hash du mot de passe avant sauvegarde
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword, // stocker le hash
            phone,
            role
        });

        await user.save();

        // Générer token
        const token = generateToken(user._id, role);

        // Ne PAS renvoyer le password !
        res.status(201).json({
            message: `${role} créé avec succès`,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Récupérer l'utilisateur avec le password (champ select:false dans le schéma)
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({ message: 'Identifiants invalides' });

        // Ajoute ceci temporairement pour debug :
        // console.log('Utilisateur trouvé :', user);

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Identifiants invalides' });

        const token = generateToken(user._id, user.role);

        // Ne pas renvoyer le mot de passe dans la réponse
        res.json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Erreur lors du login :', error); // 👈 log détaillé
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

