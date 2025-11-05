const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


sequelize.sync().then(() => {
  //app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});