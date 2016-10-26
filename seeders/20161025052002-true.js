'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username : 'test1',
      password : 'password',
      firstname: 'Homer',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'test2',
      password : 'password',
      firstname: 'Bart',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'test3',
      password : 'password',
      firstname: 'Lisa',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'test4',
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

