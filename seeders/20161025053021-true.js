'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [{
      title: "Create express framework",
      priority: "High",
      status: "Done",
      createdby: "Homer",
      assignedto: "Bart",
      creatorID: "1",
      assignedID: "2",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { title: "Setup gulp",
      priority: "Medium",
      status: "Done",
      createdby: "Homer",
      assignedto: "Bart",
      creatorID: "1",
      assignedID: "2",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { title: "Create database models",
      priority: "High",
      status: "InProgress",
      createdby: "Homer",
      assignedto: "Lisa",
      creatorID: "1",
      assignedID: "3",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { title: "Create routes",
      priority: "Medium",
      status: "Queue",
      createdby: "Homer",
      assignedto: "Lisa",
      creatorID: "1",
      assignedID: "3",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { title: "Write React jsx",
      priority: "Low",
      status: "Queue",
      createdby: "Marge",
      assignedto: "Lisa",
      creatorID: "4",
      assignedID: "3",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { title: "Style with SASS",
      priority: "Low",
      status: "Queue",
      createdby: "Marge",
      assignedto: "Lisa",
      creatorID: "4",
      assignedID: "3",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { title: "Create database selections",
      priority: "Low",
      status: "Queue",
      createdby: "Lisa",
      assignedto: "Bart",
      creatorID: "3",
      assignedID: "2",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { title: "Design React model",
      priority: "Low",
      status: "Queue",
      createdby: "Homer",
      assignedto: "Marge",
      creatorID: "1",
      assignedID: "4",
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards', null, {});
  }
};
