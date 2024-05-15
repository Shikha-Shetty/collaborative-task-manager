const { DataTypes } = require('sequelize');
const sequelize = require("../configs/sequelize.config");

const Comment = sequelize.define('comment', {
    commentId: {
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
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'comment',
    timestamps: false
  });
  
 
  module.exports = Comment;
  
  