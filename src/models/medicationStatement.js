const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const MedicationStatement = sequelize.define('MedicationStatement', {
    medicationStatement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'patientId'
      }
    },
    type: {
      type: DataTypes.ENUM('inpatient', 'outpatient', 'community')
    },
    patientInstructions: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('recorded', 'entered-in-error', 'draft')
    }
  },{freezeTableName: true, timestamps: false});
  MedicationStatement.associate = (models) => {
    MedicationStatement.belongsTo(models.Patient, { foreignKey: 'patientId' });
  };
  return MedicationStatement;
};
