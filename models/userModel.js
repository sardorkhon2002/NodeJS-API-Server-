const sequelize = require('../database');
const { DataTypes, Sequelize } = require('sequelize');

const User = sequelize.define(
  'users',
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = User;
