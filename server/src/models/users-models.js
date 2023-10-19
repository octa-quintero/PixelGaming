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
        type: DataTypes.STRING(40),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      name_user: {
        type: DataTypes.STRING(40),
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
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
};