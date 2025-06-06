const express = require('express');
const app = express();
const cors = require('cors');

const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/',userRoutes);
app.use('/',profileRoutes);
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
