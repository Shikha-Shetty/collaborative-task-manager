const { DataTypes } = require('sequelize');
const sequelize = require("../configs/sequelize.config");

const Task = sequelize.define('task', {
    taskId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE, //Equivalent to DATETIME in SQL
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      allowNull: false
    },
    assignedTo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    assignedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    }
  }, {
    tableName: 'task',
    timestamps: false
  });
  
  module.exports = Task;
  
  