const { DataTypes } = require('sequelize');

// Definición del modelo 'games'
module.exports = ( sequelize ) => {
  sequelize.define('Games', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    game_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true
    },
    release_date: {
      type: DataTypes.STRING, 
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
    timestamps: false
  });
};