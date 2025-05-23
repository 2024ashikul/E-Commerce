const {Sequelize ,DataTypes} = require('sequelize');
const sequelize  = new Sequelize({
    dialect : 'sqlite',
    storage : ':memory:'
});

const User = require('./user')(sequelize , DataTypes);

module.exports = { sequelize, User };

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect:', error);
  }
})();