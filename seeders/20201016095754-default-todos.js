'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todolists', [
      {
        todo_item: 'Learn Node.js',
        createdAt: new Date (),
        updatedAt: new Date (),
      },
      {
        todo_item: 'Learn MySQL',
        createdAt: new Date (),
        updatedAt: new Date (),
      },
      {
        todo_item: 'Learn Password.js',
        createdAt: new Date (),
        updatedAt: new Date (),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todolists', null, {});
  }
};
