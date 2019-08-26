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

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });

    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
    
  };

  //ALVARO
  Post.prototype.getPoints = function(){
    // #1
        if(this.votes.length === 0) return 0
  
    // #2
        return this.votes
          .map((v) => { return v.value })
          .reduce((prev, next) => { return prev + next });
      };
  
  Post.prototype.hasUpvoteFor = function(userId){

       let hasVoted = this.votes.find((v) => v.userId === userId)

        if (hasVoted) {
          return hasVoted.value === 1 ? true : false;
        }else{
          return false;
        }
  }

  Post.prototype.hasDownvoteFor = function(userId){

    let hasVoted = this.votes.find((v) => v.userId === userId) // Move out?

     if (hasVoted) {
       return hasVoted.value === -1 ? true : false;
     }else{
       return false;
     }
}
 
  return Post;
};