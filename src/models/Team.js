const { DataTypes } = require('sequelize');
const sequelize = require("../configs/sequelize.config"); // Assuming you have a database connection configured

const Team = sequelize.define('team', {
    teamId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teamDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'team',
    timestamps: false
  });
  
  module.exports = Team;