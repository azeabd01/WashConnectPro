const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// VÉRIFICATIONS ENVIRONNEMENT
if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET manquant dans le fichier .env !");
}


// const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Routes d'authentification
const providerRoutes = require('./routes/auth/providerRoutes');
const clientRoutes = require('./routes/auth/clientRoutes');
const prodRout = require('./routes/auth/productRoutes');
// const authRoutes = require('./routes/authRoutes');

// Routes principales (avec authentification)
const servicesRoutes = require('./routes/servicesRoutes');
const bookingsRoutes  = require('./routes/bookingsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const productRoutes = require('./routes/productsRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Routes client
const clientBookingRoutes = require('./routes//client/ClientBookingRoutes');

// Routes publiques (sans authentification)
const publicServiceRoutes = require('./routes/publicServiceRoutes');
const publicAvailabilityRoutes = require('./routes/availability');
const publicBookingsRoutes = require('./routes/publicBookingRoutes');
// const availabilitiesRoutes = require('./routes/availability');
// const availableTimeSlots = require('./routes/publicServiceRoutes');

// CONFIGURATION DE L'APPLICATION
const app = express();
const port = 3000

// Connexion à la base de données
connectDB()

// Middlewares globaux
app.use(cors());
app.use(express.json());

// ROUTES D'AUTHENTIFICATION
app.use('/api/auth', providerRoutes);
app.use('/api/auth', clientRoutes);
app.use('/api/auth', prodRout);

// ROUTES ADMINISTRATEUR
app.use('/api/admin', adminRoutes);

// ROUTES PRINCIPALES (AVEC AUTHENTIFICATION)
app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/analytics', productRoutes);
// app.use('/api/auth', authRoutes);

// ROUTES CLIENT
app.use('/api/bookings', clientBookingRoutes);
app.use('/api/client/providers', require('./routes/client/searchRoutes'));
app.use('/api/client/profile', require('./routes/client/profileRoutes'))

// ROUTES PUBLIQUES (SANS AUTHENTIFICATION)
app.use('/api/public/services', require('./routes/publicServiceRoutes'));
app.use('/api/public/bookings', publicBookingsRoutes);
app.use('/api/public', publicServiceRoutes);
app.use('/api/public/availability', publicAvailabilityRoutes);



// app.use('/api/public/bookings', require('./routes/publicBookingRoutes'));
// app.use('/api/availabilities', availableTimeSlots);
// app.use('/api/availabilities', availabilitiesRoutes);

// DÉMARRAGE DU SERVEUR
app.listen(port, () => console.log(`Server running on port ${port}}`));
