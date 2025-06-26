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


app.use('/', userRoutes);
app.use('/', profileRoutes);
app.use('/', productRoutes);
app.use('/', adminRoutes);
app.use('/', searchRoutes);
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.sync().then(() => {
  //app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});


