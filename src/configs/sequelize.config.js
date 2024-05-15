//Created a new Sequelize instance and configured it to connect to MySQL database. 

const { Sequelize } = require("sequelize");
const config = require("./sequelize.config.json");

const sequelize = new Sequelize(config.development);

module.exports = sequelize;