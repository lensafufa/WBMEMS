// models/Announcement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AlertAndNotification = sequelize.define('AlertAndNotification', {
  NotificationType: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

module.exports = AlertAndNotification;
