const express = require('express');
const app = express();
const cors = require('cors');

const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
