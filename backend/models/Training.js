const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Training = sequelize.define('Training', {
  trainingName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  equipmentName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  length: {
    type: DataTypes.STRING,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  trainingType: {
    type: DataTypes.ENUM('End user training', 'Technical personnel training'),
    allowNull: true
  },
  trainingLevel: {
    type: DataTypes.ENUM('Basic', 'Advanced', 'Refreshment'),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trainer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trainee: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Training;
