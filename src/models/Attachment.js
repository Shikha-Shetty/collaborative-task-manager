const { DataTypes } = require('sequelize');
const sequelize = require("../configs/sequelize.config"); // Database connection configured

  const Attachment = sequelize.define('attachment', {
    attachmentId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    taskId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Task',
        key: 'taskId'
      }
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileUrl: {
      type: DataTypes.STRING, // Equivalent to VARCHAR in SQL
      allowNull: false
    }
  }, {
    tableName: 'attachment', // Specified exact table name
    timestamps: false // Added for Sequelize to avoid managing createdAt and updatedAt fields
  });
  
 
  module.exports = Attachment;