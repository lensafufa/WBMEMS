// models/CalendarEvent.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CalendarEvent = sequelize.define('CalendarEvent', {
  equipmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  equipmentModel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CalendarEvent;
