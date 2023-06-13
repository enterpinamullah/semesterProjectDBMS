const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const AllergyIntolerance = sequelize.define('AllergyIntolerance', {
    allergyIntoleranceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'ID'
      }
    },
    name: {
      type: DataTypes.STRING(50)
    },
    date: {
      type: DataTypes.DATE
    },
    reaction: {
      type: DataTypes.STRING(100)
    },
    reactionOnsetDate: {
      type: DataTypes.DATE
    }
  },{freezeTableName: true, timestamps: false});
  AllergyIntolerance.associate = (models) => {
    AllergyIntolerance.belongsTo(models.Patient, { foreignKey: 'patientId' });
  };
  return AllergyIntolerance;
};
