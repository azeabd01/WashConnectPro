const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// ✅ Ajoute cette vérification ici
if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET manquant dans le fichier .env !");
}

// const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const providerRoutes = require('./routes/auth/providerRoutes');
const clientRoutes = require('./routes/auth/clientRoutes');
const prodRout = require('./routes/auth/productRoutes');

const productRoutes = require('./routes/productsRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

connectDB()

const port = 3000

app.use(cors());
app.use(express.json());

connectDB()
app.use('/api/admin', adminRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use('/api/auth', providerRoutes);
app.use('/api/auth', clientRoutes);
app.use('/api/auth', prodRout);

app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}}`));
