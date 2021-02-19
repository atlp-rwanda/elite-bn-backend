'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Ratings', [{
        userId: 4,
        accomodationId: 1,
        rating: 3,
        review: 'We got this hotel and it is becomming rags... Very angry',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Ratings', null, {});

  }
};