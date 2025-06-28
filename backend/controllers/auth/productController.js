const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Product = require('../../models/productModel'); // Modèle Product (product)

// ✅ INSCRIPTION PRODUCT
exports.registerproduct = async (req, res) => {
    // Validation des erreurs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password, phone } = req.body;

        // Vérifier si le product existe déjà
        let product = await Product.findOne({ email });
        if (product) {
            return res.status(400).json({ message: 'Ce product existe déjà' });
        }

        // Hachage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer nouveau product
        product = new Product({
            name,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            phone,
            // Valeurs par défaut pour un product
            price: 0, // Prix par défaut
            description: `Product ${name}`,
            category: 'product', // Catégorie spéciale pour identifier les products
            inStock: true,
            status: 'active'
        });

        await product.save();

        // Créer le payload JWT
        const payload = {
            productId: product._id,
            role: 'product'
        };

        // Générer le token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Product créé avec succès',
            token,
            product: {
                id: product._id,
                name: product.name,
                email: product.email,
                phone: product.phone,
                status: product.status,
                role: 'product'
            }
        });

    } catch (err) {
        console.error('Erreur inscription product:', err);
        res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
    }
};

// ✅ CONNEXION PRODUCT
exports.loginproduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Chercher le product dans la collection Product
        const product = await Product.findOne({ 
            email: email.toLowerCase().trim(),
            category: 'product' // Filtre pour ne récupérer que les products
        }).select('+password');

        if (!product) {
            return res.status(400).json({ message: 'Identifiants incorrects' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, product.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Identifiants incorrects' });
        }

        // Vérifier si le compte est actif
        if (product.status !== 'active') {
            return res.status(400).json({ message: 'Compte désactivé' });
        }

        // Créer le payload JWT
        const payload = {
            productId: product._id,
            role: 'product'
        };

        // Générer le token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Connexion réussie',
            token,
            product: {
                id: product._id,
                name: product.name,
                email: product.email,
                phone: product.phone,
                status: product.status,
                rating: product.rating,
                image: product.image,
                role: 'product'
            }
        });

    } catch (err) {
        console.error('Erreur connexion product:', err);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
    }
};

// ✅ RÉCUPÉRER PROFIL PRODUCT
exports.getMeproduct = async (req, res) => {
    try {
        // req.product vient du middleware d'authentification
        const product = await Product.findById(req.product.id).select('-password');
        
        if (!product) {
            return res.status(404).json({ message: 'Product non trouvé' });
        }

        res.json({
            product: {
                id: product._id,
                name: product.name,
                email: product.email,
                phone: product.phone,
                description: product.description,
                image: product.image,
                status: product.status,
                rating: product.rating,
                inStock: product.inStock,
                createdAt: product.createdAt,
                role: 'product'
            }
        });

    } catch (err) {
        console.error('Erreur récupération profil:', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// // ✅ METTRE À JOUR PROFIL PRODUCT
// exports.updateProfile = async (req, res) => {
//     try {
//         const { name, phone, description, image } = req.body;
        
//         const product = await Product.findById(req.product.id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product non trouvé' });
//         }

//         // Mise à jour des champs autorisés
//         if (name) product.name = name;
//         if (phone) product.phone = phone;
//         if (description) product.description = description;
//         if (image) product.image = image;

//         await product.save();

//         res.json({
//             message: 'Profil mis à jour avec succès',
//             product: {
//                 id: product._id,
//                 name: product.name,
//                 email: product.email,
//                 phone: product.phone,
//                 description: product.description,
//                 image: product.image,
//                 status: product.status,
//                 rating: product.rating,
//                 role: 'product'
//             }
//         });

//     } catch (err) {
//         console.error('Erreur mise à jour profil:', err);
//         res.status(500).json({ message: 'Erreur serveur lors de la mise à jour' });
//     }
// };

// // ✅ CHANGER STATUT DU PRODUCT
// exports.changeStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
        
//         if (!['active', 'inactive'].includes(status)) {
//             return res.status(400).json({ message: 'Statut invalide' });
//         }

//         const product = await Product.findById(req.product.id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product non trouvé' });
//         }

//         product.status = status;
//         product.inStock = status === 'active';
//         await product.save();

//         res.json({
//             message: `Statut changé vers ${status}`,
//             product: {
//                 id: product._id,
//                 name: product.name,
//                 status: product.status,
//                 inStock: product.inStock
//             }
//         });

//     } catch (err) {
//         console.error('Erreur changement statut:', err);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// // ✅ RÉCUPÉRER TOUS LES PRODUCTS (pour admin)
// exports.getAllProducts = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, status, search } = req.query;
        
//         let query = { category: 'product' };
        
//         // Filtres
//         if (status) query.status = status;
//         if (search) {
//             query.$or = [
//                 { name: { $regex: search, $options: 'i' } },
//                 { email: { $regex: search, $options: 'i' } }
//             ];
//         }

//         const products = await Product.find(query)
//             .select('-password')
//             .sort({ createdAt: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const total = await Product.countDocuments(query);

//         res.json({
//             products,
//             totalPages: Math.ceil(total / limit),
//             currentPage: page,
//             total
//         });

//     } catch (err) {
//         console.error('Erreur récupération products:', err);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// // ✅ SUPPRIMER COMPTE PRODUCT
// exports.deleteAccount = async (req, res) => {
//     try {
//         const product = await Product.findById(req.product.id);
//         if (!product) {
//             return res.status(404).json({ message: 'product non trouvé' });
//         }

//         await Product.findByIdAndDelete(req.product.id);

//         res.json({ message: 'Compte supprimé avec succès' });

//     } catch (err) {
//         console.error('Erreur suppression compte:', err);
//         res.status(500).json({ message: 'Erreur serveur lors de la suppression' });
//     }
// };