module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Edmond',
        lastName: 'Ndayishimiye',
        email: 'edmond@example.com',
        password: 'samplepassword',
        isVerified: true,
        token: null,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Alexi',
        lastName: 'vacilli',
        email: 'alexi@example.com',
        password: 'samplepassword',
        isVerified: true,
        token: null,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@barefoot.com',
        // Admin password is "admin1234"
        password: '$2b$10$5bVBlFQxpo3.laIrak8wFuRk5RkfkmLd5N1EuHVTlLFUto/eEoGqe',
        isVerified: true,
        token: null,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'requesterTest',
        lastName: 'testing',
        email: 'neddyberry@gmail.com',
        // requesterTest password is "admin1234"
        password: '$2b$10$5bVBlFQxpo3.laIrak8wFuRk5RkfkmLd5N1EuHVTlLFUto/eEoGqe',
        isVerified: true,
        token: null,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Kamanzi',
        lastName: 'Daliah',
        email: 'traveladmin@gmail.com',
        isVerified: true,
        password: 'traveladmin',
        token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Gael',
        lastName: 'Cyusa',
        email: 'traveladmin2021@gmail.com',
        isVerified: true,
        password: '$2b$10$5N/kpaDcFaT9X1aM4jkrsua.rfCkfq1hdFKu88PE6ROKL0ew.iIKq',
        roleId: 2,
        token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        firstName: 'Freddy',
        lastName: 'Cyusa',
        email: 'trojanx07@gmail.com',
        isVerified: true,
        password: '$2b$10$5bVBlFQxpo3.laIrak8wFuRk5RkfkmLd5N1EuHVTlLFUto/eEoGqe',
        roleId: 3,
        token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        firstName: 'William James',
        lastName: 'Sidis',
        email: 'sidis2009@gmail.com',
        isVerified: true,
        password: '$2b$10$5bVBlFQxpo3.laIrak8wFuRk5RkfkmLd5N1EuHVTlLFUto/eEoGqe',
        roleId: 2,
        token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
