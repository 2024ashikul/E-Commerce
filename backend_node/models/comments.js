const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments',{
        id : {type : DataTypes.INTEGER , primaryKey : true , autoIncrement : true},
        comment : {type : DataTypes.STRING , allowNull : false}
    });
    return Comments;
}
