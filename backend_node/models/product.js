const express = require('express')
const { sequelize } = require('.')
const { DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product',{
        id : {type : DataTypes.INTEGER , autoIncrement : true , primaryKey : true},
        name : {type : DataTypes.STRING , allowNull : false},
        brand : {type : DataTypes.STRING , allowNull : false},
        releasedate : {type : DataTypes.STRING , allowNull : false},
        description : {type : DataTypes.STRING , allowNull : false},
        price : {type : DataTypes.INTEGER , allowNull : false},
        stock : {type : DataTypes.INTEGER , allowNull : false},
        category : {type : DataTypes.STRING , allowNull : false},
        availability : {type : DataTypes.STRING , allowNull : false}
    });
    return Product;
}