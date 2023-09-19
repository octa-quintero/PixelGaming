const { DataTypes } = require('sequelize');

// Definición del modelo 'users'
module.exports = (sequelize) => {
  sequelize.define('Users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name_users: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      createdAt: false,
      updatedAt: false,
      timestamps: false
    });
};