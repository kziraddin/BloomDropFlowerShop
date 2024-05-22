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

const Order = sequelize.define(
  "Order",
  {
    // Define model attributes
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // to create Order in future
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      index: true, // makes it non-unique
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DeliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    TotalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable timestamps
  }
);

module.exports = Order;
