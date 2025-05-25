const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize , DataTypes) =>{
    const Cart = sequelize.define('Cart',{
        id : {type : DataTypes.INTEGER , autoIncrement : true , primaryKey : true},
        quantity : {type : DataTypes.INTEGER , allowNull : false ,defualtValue : 1}
    });
    return Cart;
}