const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.config"); // Import the Sequelize instance from db.config.js

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.dialect,
  pool: {
    max: db.pool.max,
    min: db.pool.min,
    acquire: db.pool.acquire,
    idle: db.pool.idle,
  },
});

const User = sequelize.define(
  "User",
  {
    // Define model attributes
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // to create user in future
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable timestamps
  }
);

module.exports = User;
