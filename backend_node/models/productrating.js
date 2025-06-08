const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const ProductRating = sequelize.define('ProductRating',{
        id : {type : DataTypes.INTEGER , primaryKey : true , autoIncrement : true},
        rating : {type : DataTypes.INTEGER , allowNull : false}
    });
    return ProductRating;
}
