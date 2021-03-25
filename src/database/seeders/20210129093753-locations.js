module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Locations',
      [
        {
          name: 'Kigali',
          location_id: '10000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Musanze',
          location_id: '20000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gisenyi',
          location_id: '30000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Locations', null, {});
  },
};
