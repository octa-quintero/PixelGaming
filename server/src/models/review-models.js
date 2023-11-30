const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 2,
      },
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    GameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_user: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['UserId', 'GameId'],
        name: 'unique_review',
      },
    ],
  });

  return Review;
};
