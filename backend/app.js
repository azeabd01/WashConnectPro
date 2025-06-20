const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const port = 3000
const productRoutes = require('./routes/productsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB()

app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}}`));
