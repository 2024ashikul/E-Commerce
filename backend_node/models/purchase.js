const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.defind('Purchase',{
        id : {type : DataTypes.INTEGER , primaryKey : true , autoIncrement : true},
        quantity : {type : DataTypes.INTEGER , allowNull : false},
        time : {type : DataTypes.DATETIME , allowNull : false}
    });
    return Purchase;
}