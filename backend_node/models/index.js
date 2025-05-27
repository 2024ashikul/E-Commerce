const {Sequelize ,DataTypes} = require('sequelize');
const sequelize  = new Sequelize({
    dialect : 'sqlite',
    storage : ':memory:'
});

const User = require('./user')(sequelize , DataTypes);
const Product = require('./product')(sequelize , DataTypes);
const Cart = require('./cart.js')(sequelize , DataTypes);


//Relationships
User.hasMany(Cart);
Cart.belongsTo(User);



module.exports = { sequelize, User , Product , Cart };

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect:', error);
  }
})();