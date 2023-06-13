
module.exports = (sequelize, DataTypes) => {
  const VerificationCodes = sequelize.define(
    'VerificationCodes',
    {
      code_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // index: true,
      },
      user_uuid: { // associated user
        type: DataTypes.STRING,
        references: { model: 'users', key: 'user_uuid' },
      },
      email: { // associated user
        type: DataTypes.STRING,
      },
      expires: {
        type: DataTypes.DATE,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
    },
  );
  return VerificationCodes;
};
