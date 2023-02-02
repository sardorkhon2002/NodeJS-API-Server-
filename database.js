const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('authentication', 'postgres', '17062002', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
});

module.exports = sequelize;
