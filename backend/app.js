const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB()

const port = 3000

const productRoutes = require('./routes/productsRoutes');

const analyticsRoutes = require('./routes/analyticsRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');

const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/api/analytics', analyticsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);

app.use('/api/auth', authRoutes);


app.listen(port, () => console.log(`Server running on port ${port}}`));
