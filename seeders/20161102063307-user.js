'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username : 'Homer',
      password : 'password',
      firstname: 'Homer',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'Bart',
      password : 'password',
      firstname: 'Bart',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'Lisa',
      password : 'password',
      firstname: 'Lisa',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'Marge',
      password : 'password',
      firstname: 'Marge',
      createdAt : new Date(),
      updatedAt : new Date()
    }

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
