const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/',userRoutes);
app.use('/',profileRoutes);

app.use('/', productRoutes);
app.use('/',adminRoutes);
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
