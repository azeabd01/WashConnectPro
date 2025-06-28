// // ===== controllers/authController.js =====
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');
// const { User, Provider, Client, Fournisseur } = require('../../models/User');

// // ✅ REGISTRATION PROVIDER (PRESTATAIRE)
// exports.registerProvider = async (req, res) => {
//     console.log('🟢 Début registerProvider avec données:', req.body);
    
//     // Validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log('❌ Erreurs de validation:', errors.array());
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { name, email, password, phone, businessName, address, workingHours } = req.body;
//         const emailLower = email.toLowerCase().trim();

//         console.log('🔍 Vérification existence email:', emailLower);
        
//         // Vérifier si l'email existe déjà (tous types confondus)
//         const existingUser = await User.findOne({ email: emailLower });
//         if (existingUser) {
//             console.log('❌ Email déjà existant:', emailLower);
//             return res.status(400).json({ message: 'Un compte avec cet email existe déjà' });
//         }

//         console.log('✅ Email disponible, création du provider...');

//         // Créer le prestataire
//         const provider = new Provider({
//             name: name.trim(),
//             email: emailLower,
//             password: password, // Sera hashé par le middleware pre('save')
//             phone: phone.trim(),
//             businessName: businessName.trim(),
//             address: address || {},
//             workingHours: workingHours || undefined, // Utilisera la valeur par défaut
//             status: 'active',
//             rating: 0
//         });

//         console.log('💾 Sauvegarde du provider...');
//         await provider.save();
//         console.log('✅ Provider créé avec ID:', provider._id);

//         // Générer le token JWT
//         const payload = { 
//             userId: provider._id, 
//             userType: provider.userType, 
//             role: 'provider' 
//         };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

//         console.log('✅ Token généré, envoi de la réponse');

//         res.status(201).json({
//             message: 'Inscription prestataire réussie',
//             token,
//             userType: 'provider',
//             provider: {
//                 id: provider._id,
//                 name: provider.name,
//                 email: provider.email,
//                 businessName: provider.businessName,
//                 phone: provider.phone,
//                 status: provider.status,
//                 role: 'provider'
//             }
//         });

//     } catch (err) {
//         console.error('💥 Erreur inscription prestataire:', err);
//         console.error('Stack trace:', err.stack);
        
//         // Vérifier si c'est une erreur de validation Mongoose
//         if (err.name === 'ValidationError') {
//             const validationErrors = Object.values(err.errors).map(e => e.message);
//             return res.status(400).json({ 
//                 message: 'Erreur de validation', 
//                 errors: validationErrors 
//             });
//         }
        
//         // Erreur de duplication (index unique)
//         if (err.code === 11000) {
//             return res.status(400).json({ 
//                 message: 'Un compte avec cet email existe déjà' 
//             });
//         }
        
//         res.status(500).json({ 
//             message: 'Erreur serveur lors de l\'inscription',
//             error: process.env.NODE_ENV === 'development' ? err.message : undefined
//         });
//     }
// };

// // ✅ REGISTRATION CLIENT
// exports.registerClient = async (req, res) => {
//     console.log('🟢 Début registerClient avec données:', req.body);
    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log('❌ Erreurs de validation:', errors.array());
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { name, email, password, phone, address, preferences } = req.body;
//         const emailLower = email.toLowerCase().trim();

//         console.log('🔍 Vérification existence email:', emailLower);
        
//         // Vérifier si l'email existe déjà
//         const existingUser = await User.findOne({ email: emailLower });
//         if (existingUser) {
//             console.log('❌ Email déjà existant:', emailLower);
//             return res.status(400).json({ message: 'Un compte avec cet email existe déjà' });
//         }

//         console.log('✅ Email disponible, création du client...');

//         // Créer le client
//         const client = new Client({
//             name: name.trim(),
//             email: emailLower,
//             password: password, // Sera hashé par le middleware
//             phone: phone.trim(),
//             address: address || {},
//             preferences: preferences || {
//                 notifications: {
//                     email: true,
//                     sms: false
//                 }
//             }
//         });

//         console.log('💾 Sauvegarde du client...');
//         await client.save();
//         console.log('✅ Client créé avec ID:', client._id);

//         // Générer le token JWT
//         const payload = { 
//             userId: client._id, 
//             userType: client.userType, 
//             role: 'client' 
//         };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

//         res.status(201).json({
//             message: 'Inscription client réussie',
//             token,
//             userType: 'client',
//             client: {
//                 id: client._id,
//                 name: client.name,
//                 email: client.email,
//                 phone: client.phone,
//                 role: 'client'
//             }
//         });

//     } catch (err) {
//         console.error('💥 Erreur inscription client:', err);
//         console.error('Stack trace:', err.stack);
        
//         if (err.name === 'ValidationError') {
//             const validationErrors = Object.values(err.errors).map(e => e.message);
//             return res.status(400).json({ 
//                 message: 'Erreur de validation', 
//                 errors: validationErrors 
//             });
//         }
        
//         if (err.code === 11000) {
//             return res.status(400).json({ 
//                 message: 'Un compte avec cet email existe déjà' 
//             });
//         }
        
//         res.status(500).json({ 
//             message: 'Erreur serveur lors de l\'inscription',
//             error: process.env.NODE_ENV === 'development' ? err.message : undefined
//         });
//     }
// };

// // ✅ REGISTRATION FOURNISSEUR
// exports.registerFournisseur = async (req, res) => {
//     console.log('🟢 Début registerFournisseur avec données:', req.body);
    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log('❌ Erreurs de validation:', errors.array());
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { name, email, password, phone, description } = req.body;
//         const emailLower = email.toLowerCase().trim();

//         console.log('🔍 Vérification existence email:', emailLower);
        
//         // Vérifier si l'email existe déjà
//         const existingUser = await User.findOne({ email: emailLower });
//         if (existingUser) {
//             console.log('❌ Email déjà existant:', emailLower);
//             return res.status(400).json({ message: 'Un compte avec cet email existe déjà' });
//         }

//         console.log('✅ Email disponible, création du fournisseur...');

//         // Créer le fournisseur
//         const fournisseur = new Fournisseur({
//             name: name.trim(),
//             email: emailLower,
//             password: password, // Sera hashé par le middleware
//             phone: phone.trim(),
//             description: description || '',
//             category: 'fournisseur',
//             status: 'active',
//             rating: 0,
//             inStock: true
//         });

//         console.log('💾 Sauvegarde du fournisseur...');
//         await fournisseur.save();
//         console.log('✅ Fournisseur créé avec ID:', fournisseur._id);

//         // Générer le token JWT
//         const payload = { 
//             userId: fournisseur._id, 
//             userType: fournisseur.userType, 
//             role: 'fournisseur' 
//         };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

//         res.status(201).json({
//             message: 'Inscription fournisseur réussie',
//             token,
//             userType: 'fournisseur',
//             fournisseur: {
//                 id: fournisseur._id,
//                 name: fournisseur.name,
//                 email: fournisseur.email,
//                 phone: fournisseur.phone,
//                 description: fournisseur.description,
//                 status: fournisseur.status,
//                 role: 'fournisseur'
//             }
//         });

//     } catch (err) {
//         console.error('💥 Erreur inscription fournisseur:', err);
//         console.error('Stack trace:', err.stack);
        
//         if (err.name === 'ValidationError') {
//             const validationErrors = Object.values(err.errors).map(e => e.message);
//             return res.status(400).json({ 
//                 message: 'Erreur de validation', 
//                 errors: validationErrors 
//             });
//         }
        
//         if (err.code === 11000) {
//             return res.status(400).json({ 
//                 message: 'Un compte avec cet email existe déjà' 
//             });
//         }
        
//         res.status(500).json({ 
//             message: 'Erreur serveur lors de l\'inscription',
//             error: process.env.NODE_ENV === 'development' ? err.message : undefined
//         });
//     }
// };

// // ✅ LOGIN UNIFIÉ
// exports.login = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { email, password } = req.body;
//         const emailLower = email.toLowerCase().trim();
        
//         // Chercher l'utilisateur (tous types)
//         const user = await User.findOne({ email: emailLower }).select('+password');
        
//         if (!user) {
//             return res.status(400).json({ message: 'Identifiants incorrects' });
//         }

//         // Vérifier le mot de passe
//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Identifiants incorrects' });
//         }

//         // Vérifier si le compte est actif
//         if (user.status !== 'active') {
//             return res.status(400).json({ message: 'Compte désactivé' });
//         }

//         // Générer le token JWT
//         const payload = { 
//             userId: user._id, 
//             userType: user.userType, 
//             role: user.userType 
//         };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

//         // Mettre à jour la dernière connexion
//         user.lastLogin = new Date();
//         await user.save();

//         // Réponse adaptée selon le type d'utilisateur
//         let responseData = {
//             message: 'Connexion réussie',
//             token,
//             userType: user.userType
//         };

//         // Données spécifiques selon le profil
//         const userData = {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             avatar: user.avatar,
//             rating: user.rating,
//             status: user.status,
//             role: user.userType
//         };

//         switch (user.userType) {
//             case 'provider':
//                 responseData.provider = {
//                     ...userData,
//                     businessName: user.businessName,
//                     workingHours: user.workingHours
//                 };
//                 break;

//             case 'client':
//                 responseData.client = {
//                     ...userData,
//                     preferences: user.preferences
//                 };
//                 break;

//             case 'fournisseur':
//                 responseData.fournisseur = {
//                     ...userData,
//                     description: user.description,
//                     inStock: user.inStock
//                 };
//                 break;
//         }

//         res.json(responseData);

//     } catch (err) {
//         console.error('Erreur connexion:', err);
//         res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
//     }
// };

// // ✅ RÉCUPÉRER PROFIL UTILISATEUR CONNECTÉ
// exports.getMe = async (req, res) => {
//     try {
//         const { user, userType } = req;

//         let responseData = { userType: user.userType };

//         const userData = {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             address: user.address,
//             avatar: user.avatar,
//             rating: user.rating,
//             status: user.status,
//             role: user.userType,
//             createdAt: user.createdAt
//         };

//         switch (user.userType) {
//             case 'provider':
//                 responseData.provider = {
//                     ...userData,
//                     businessName: user.businessName,
//                     workingHours: user.workingHours
//                 };
//                 break;

//             case 'client':
//                 responseData.client = {
//                     ...userData,
//                     preferences: user.preferences
//                 };
//                 break;

//             case 'fournisseur':
//                 responseData.fournisseur = {
//                     ...userData,
//                     description: user.description,
//                     inStock: user.inStock
//                 };
//                 break;
//         }

//         res.json(responseData);

//     } catch (err) {
//         console.error('Erreur récupération profil:', err);
//         res.status(500).json({ message: 'Erreur serveur', error: err.message });
//     }
// };

// // ✅ LOGOUT
// exports.logout = async (req, res) => {
//     try {
//         res.json({ message: 'Déconnexion réussie' });
//     } catch (err) {
//         console.error('Erreur déconnexion:', err);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };