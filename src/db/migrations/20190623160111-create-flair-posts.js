'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FlairPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flairId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "Flairs",
          key: "id",
          as: "flairId",
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "Posts",
          key: "id",
          as: "postId",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FlairPosts');
  }
};