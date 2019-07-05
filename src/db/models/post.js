'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
 
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
    Post.belongsToMany(models.Flair, {
      through: 'FlairPosts',
      foreignKey: 'postId',
      as: "flairs",
      onDelete: 'CASCADE'
    });

    Post.hasMany(models.FlairPosts, {
      foreignKey: "postId",
      as: "flairposts"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    
  };
  return Post;
};