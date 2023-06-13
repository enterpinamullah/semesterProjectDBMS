
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    user_uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    patientId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'Patient', key: 'patientId' },
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    profilePic: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    groups: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    lat: {
      type: Sequelize.FLOAT,
    },
    long: {
      type: Sequelize.FLOAT,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
