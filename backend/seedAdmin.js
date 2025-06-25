require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connexion à MongoDB Atlas réussie');

        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('⚠️ Un administrateur existe déjà :', existingAdmin.email);
            return process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10); // 🔐 Change le mot de passe ici si tu veux

        const admin = new User({
            name: 'Admin Principal',
            email: 'admin@gmail.com',
            phone: '+212600000000',
            password: hashedPassword,
            role: 'admin',
        });

        await admin.save();
        console.log('✅ Administrateur créé avec succès !');
        console.log('Email : admin@gmail.com');
        console.log('Mot de passe : admin123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors de la création de l\'admin :', error.message);
        process.exit(1);
    }
};

seedAdmin();
