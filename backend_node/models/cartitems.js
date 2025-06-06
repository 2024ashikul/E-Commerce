const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems',{
        id : {type:DataTypes.INTEGER , autoIncrement  :true , primaryKey : true},
        quantity : {type : DataTypes.INTEGER, defaultValue : 1}
    });
    return CartItems;
}