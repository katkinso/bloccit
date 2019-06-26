'use strict';
module.exports = (sequelize, DataTypes) => {
  var FlairPosts = sequelize.define('FlairPosts', {
    flairId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Flair",
        key: "id",
        as: "flairId",
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Post",
        key: "id",
        as: "postId",
      }
    }
  }, {});
  FlairPosts.associate = function (models) {
    // associations can be defined here
    FlairPosts.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });

    FlairPosts.belongsTo(models.Flair, {
      foreignKey: "flairId",
      onDelete: "CASCADE"
    });
  };
  return FlairPosts;
};