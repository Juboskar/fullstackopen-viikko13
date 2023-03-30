const { Sequelize } = require("sequelize");
const config = require("../utils/config");

const db = new Sequelize(config.DATABASE_URL);

module.exports = db;
