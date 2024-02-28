// models/Announcement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Announcement = sequelize.define('Announcement', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  announcement_time:{
    type: DataTypes.DATE,
    allowNull: false,
  }
});

module.exports = Announcement;
