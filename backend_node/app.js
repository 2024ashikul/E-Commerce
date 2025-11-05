const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const searchRoutes = require('./routes/searchRoutes')
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use(cors());


app.use('/api/v1/', userRoutes);
app.use('/api/v1/', profileRoutes);
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', adminRoutes);
app.use('/api/v1/', searchRoutes);
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;



