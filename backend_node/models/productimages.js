const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize , DataTypes) => {
    const productimages = sequelize.define('ProductImages',{
        id : {type : DataTypes.INTEGER , autoIncrement : true, primaryKey : true },
        name : {type : DataTypes.STRING , allowNull : false},
        path : {type : DataTypes.STRING , allowNull : false}
    });
    return productimages;
}