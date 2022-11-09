const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Flavor extends Model {}

Flavor.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false
    },
    pic: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false
    },
},{
    sequelize
});

module.exports=Flavor