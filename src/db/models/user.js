'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "member"
  }
    }, {});
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts"
    });

    User.hasMany(models.Vote, {
      foreignKey: "userId",
      as: "votes"
    });

    // User.hasMany(models.Favorite, {
    //   foreignKey: "userId",
    //   as: "favorites"
    // });

    User.belongsToMany(models.Post, 
      {
        through: models.Favorite,
        as: 'favorites',
        foreignKey: "userId"
      }
     )


  //   User.addScope("favoritePosts", (userId) => {
  //     return {
  //       include: [{
  //         model: models.Favorite
  //       }],
  //       where: { id: userId},
  //       order: [["createdAt", "DESC"]]
  //     }
  //  });

    User.addScope("favoritePostsAlvaro", (userId) => {
      return {
        include: [{
          model: models.Post, as: 'favorites',
          through: models.Favorite        }
        ],
        where: { id: userId},
        // attributes: ['postId', 'id', 'userId', 'title','body','topicId'],  
        order: [["createdAt", "DESC"]]
      };
    });

      User.addScope("favoritePosts", (userId) => {
        return {
          include: [{
            model: models.Favorite, as: 'favorites',
            attributes: ['postId']
            }
          ],
          where: { id: userId},
          order: [["createdAt", "DESC"]]
        }
      });

      User.addScope("favoritePostsAssoc", (ids) => {
        return {
          include: [{
            model: models.Post, as: 'posts',
            attributes: ['id','title'],
            where: { id: { [sequelize.Op.in]: ids } }
            }
          ],
          order: [["createdAt", "DESC"]]
        }
      });

      //----

      

  };


  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };

 
  return User;
};



