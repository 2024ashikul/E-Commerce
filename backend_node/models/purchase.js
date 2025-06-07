const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('Purchase',{
        id : {type : DataTypes.INTEGER , primaryKey : true , autoIncrement : true},
        quantity : {type : DataTypes.INTEGER , allowNull : false},
        unitPrice :{type : DataTypes.INTEGER ,allowNull : false},
        totalPrice : {type : DataTypes.INTEGER, allowNull : false}
    });
    return Purchase;
}