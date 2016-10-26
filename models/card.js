'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    priority: DataTypes.STRING,
    status: DataTypes.STRING,
    createdby: DataTypes.STRING,
    assignedto: DataTypes.STRING,
    creatorID: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    assignedID: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // Card.belongsTo(models.User);
        // Please refer to migration
      }
    }
  });
  return Card;
};