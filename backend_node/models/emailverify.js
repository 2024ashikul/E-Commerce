const { DataTypes } = require("sequelize");
const { sequelize } = require(".");



module.exports= (sequelize, DataTypes) =>  {
    const EmailVerify = sequelize.define('EmailVerify',{
        id : {type: DataTypes.INTEGER , autoIncrement : true, primaryKey : true},
        email : {type : DataTypes.STRING , allowNull : false},
        code : { type : DataTypes.STRING , allowNull : false}
    });
    return EmailVerify;
}