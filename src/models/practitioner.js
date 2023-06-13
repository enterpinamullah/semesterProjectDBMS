const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Practitioner = sequelize.define('Practitioner', {
    practitionerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(50)
    },
    middleNames: {
      type: DataTypes.STRING(250)
    },
    lastName: {
      type: DataTypes.STRING(50)
    },
    telecomSystem: {
      type: DataTypes.STRING(50)
    },
    address: {
      type: DataTypes.STRING(250)
    },
    gender: {
      type: DataTypes.STRING(50)
    },
    birthDate: {
      type: DataTypes.DATE
    },
    qualificationCode: {
      type: DataTypes.STRING(50)
    },
    languageCode: {
      type: DataTypes.STRING(50)
    }
  },{freezeTableName: true, timestamps: false});
  Practitioner.associate = (models) => {
    Practitioner.hasMany(models.Encounter, { foreignKey: 'practitionerId' });
  };
  
  return Practitioner;
};
