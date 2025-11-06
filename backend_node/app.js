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
const basicAuth = require('express-basic-auth');
app.use(express.json());
app.use(cors());
const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'E-Commerce API', version: '1.0.0' },
  },
  apis: ['./routes/*.js'], // <-- add JSDoc comments in routes
};

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  basicAuth({
    users: { admin: 'password123' },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(specs
);


app.use('/api/v1/', userRoutes);
app.use('/api/v1/', profileRoutes);
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', adminRoutes);
app.use('/api/v1/', searchRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express' });
});
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;



