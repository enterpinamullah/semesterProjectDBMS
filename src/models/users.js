const { randomUUID } = require("crypto");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      user_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.NUMERIC,
        allowNull: true,
        unique: true,
        references: { model: 'Patient', key: 'patientId' },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      groups: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      long: {
        type: DataTypes.FLOAT,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
   
  );
  User.associate = (models) => {
    User.hasOne(models.Patient, { foreignKey: 'patientId' })
  };
 
  return User;
};
