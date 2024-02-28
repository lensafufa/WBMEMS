// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Inventory = sequelize.define('Inventory', {
   equipmentName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  model:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialNumber:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  equipmentDepartment:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  equipmentDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maintenanceHistory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  countryOfOrigin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  warrantyExpiryDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  equipmentImage: {
    type: DataTypes.STRING,
    allowNull: true
  }, 
  status:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Active'
  }

});
module.exports = Inventory;
