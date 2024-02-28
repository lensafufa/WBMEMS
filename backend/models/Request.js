// models/Announcement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Request = sequelize.define('Request', {
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
  },
  stat:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Request;
