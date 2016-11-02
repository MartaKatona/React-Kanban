'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdby: {
        type: Sequelize.STRING
      },
      assignedto: {
        type: Sequelize.STRING
      },
      creatorID: {
        type: Sequelize.INTEGER
      },
      assignedID: {
        type: Sequelize.INTEGER
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Cards');
  }
};