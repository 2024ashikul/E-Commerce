const {Sequelize ,DataTypes} = require('sequelize');
const purchase = require('./purchase.js');
const product = require('./product');
const productrating = require('./productrating.js');
const sequelize  = new Sequelize({
    dialect : 'sqlite',
    storage: './database.sqlite'
});

const User = require('./user')(sequelize , DataTypes);
const Product = require('./product')(sequelize , DataTypes);
const Cart = require('./cart.js')(sequelize , DataTypes);
const Purchase = require('./purchase.js')(sequelize, DataTypes);
const CartItems = require('./cartitems.js')(sequelize , DataTypes);
const ProductImages = require('./productimages.js')(sequelize , DataTypes);
const ProductRating = require('./productrating.js')(sequelize , DataTypes);
const Comments = require('./comments.js')(sequelize ,DataTypes);


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

Product.hasMany(ProductImages , {foreignKey : 'productId' , onDelete : 'CASCADE'});
ProductImages.belongsTo(Product , {foreignKey : 'productId'});

Product.hasMany(ProductRating , {foreignKey : 'productId' , onDelete : 'CASCADE'});
ProductRating.belongsTo(Product , {foreignKey :'productId'});

User.hasMany(ProductRating , {foreignKey : 'userId' , onDelete : 'CASCADE'});
ProductRating.belongsTo(User , {foreignKey :'userId'});

Product.hasMany(Comments , {foreignKey : 'productId' , onDelete : 'CASCADE'});
Comments.belongsTo(Product , {foreignKey :'productId'});

User.hasMany(Comments , {foreignKey : 'userId' , onDelete : 'CASCADE'});
Comments.belongsTo(User , {foreignKey :'userId'});

module.exports = { sequelize, User , Product , Cart , Purchase, CartItems , ProductImages , ProductRating , Comments};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect:', error);
  }
})();