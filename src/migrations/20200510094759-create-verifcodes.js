const { randomUUID } = require("crypto");
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('VerificationCodes', {
    code_id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    code: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // index: true,
    },
    user_uuid: { // associated user
      type: Sequelize.STRING,
      references: { model: 'Users', key: 'user_uuid' },
    },
    email: {
      type: Sequelize.STRING,
    },
    expires: {
      type: Sequelize.DATE,
    },
    blacklisted: {
      type: Sequelize.BOOLEAN,
      default: false,
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
// associate the user with the verification code
