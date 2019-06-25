'use strict';
module.exports = (sequelize, DataTypes) => {
  var FlairPosts = sequelize.define('FlairPosts', {
    flairId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
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