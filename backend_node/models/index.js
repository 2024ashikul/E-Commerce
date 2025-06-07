const {Sequelize ,DataTypes} = require('sequelize');
const purchase = require('./purchase.js');
const product = require('./product');
const sequelize  = new Sequelize({
    dialect : 'sqlite',
    storage: './database.sqlite'
});

const User = require('./user')(sequelize , DataTypes);
const Product = require('./product')(sequelize , DataTypes);
const Cart = require('./cart.js')(sequelize , DataTypes);
const Purchase = require('./purchase.js')(sequelize, DataTypes);
const CartItems = require('./cartitems.js')(sequelize , DataTypes);

//Relationships
User.hasOne(Cart , {foreignKey : 'userId'});
Cart.belongsTo(User, {foreignKey : 'userId'});

Cart.hasMany(CartItems , {foreignKey : 'cartId'});
CartItems.belongsTo(Cart , {foreignKey : 'cartId'});

Product.hasMany(CartItems, {foreignKey : 'productId'});
CartItems.belongsTo(Product , {foreignKey : 'productId'});

User.hasMany(Purchase ,{foreignKey : 'userId'} );
Purchase.belongsTo(User, {foreignKey : 'userId'} );

Product.hasMany(Purchase ,{foreignKey : 'productId'});
Purchase.belongsTo(Product , {foreignKey : 'productId'})


module.exports = { sequelize, User , Product , Cart , Purchase, CartItems};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect:', error);
  }
})();