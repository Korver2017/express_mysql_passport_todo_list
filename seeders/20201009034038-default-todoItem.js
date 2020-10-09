'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TodoLists', [{
      todo_item: 'Node.js',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      todo_item: 'Vue.js',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      todo_item: 'Vuex',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TodoLists', null, {});
  }
};
