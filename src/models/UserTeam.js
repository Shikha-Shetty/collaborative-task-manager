const { DataTypes } = require('sequelize');
const sequelize = require("../configs/sequelize.config");

const UserTeam = sequelize.define('userTeam', {
    userTeamId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    teamId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'teamId'
      }
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    }
  }, {
    tableName: 'userTeam',
    timestamps: false
  });
  
  module.exports = UserTeam;
  
  