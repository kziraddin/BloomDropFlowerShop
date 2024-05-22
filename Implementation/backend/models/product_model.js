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

const Product = sequelize.define(
  "Product",
  {
    // Define model attributes
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // to create Product in future
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable timestamps
  }
);

module.exports = Product;
