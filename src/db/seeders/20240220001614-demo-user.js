'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [{
      id: '66fbb85c-970f-44be-8922-405d8c8d9242',
      email: 'Jonhdoe@example.com',
      password: '23df2rf32f23f32fewfwefwefwef'
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user');
  }
};
