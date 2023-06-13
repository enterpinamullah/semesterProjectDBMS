const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Patient = sequelize.define('Patient', {
    patientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100)
    },
    dob: {
      type: DataTypes.DATE
    },
    cnic: {
      type: DataTypes.STRING(15)
    },
    telephone: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(50)
    },
    address: {
      type: DataTypes.STRING(250)
    },
    insuranceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Insurance',
        key: 'insuranceId'
      }
    }
  },{freezeTableName: true,timestamps: false});
  Patient.associate = (models) => {
    Patient.belongsTo(models.Insurance, { foreignKey: 'insuranceId' });
    Patient.hasMany(models.ObservationVitalSigns, { foreignKey: 'patientId' });
    Patient.hasMany(models.ObservationLaboratory, { foreignKey: 'patientId' });
    Patient.hasMany(models.AllergyIntolerance, { foreignKey: 'patientId' });
    Patient.hasMany(models.Immunization, { foreignKey: 'patientId' });
    Patient.hasMany(models.Procedures, { foreignKey: 'patientId' });
    Patient.hasMany(models.Condition, { foreignKey: 'patientId' });
    Patient.hasMany(models.Encounter, { foreignKey: 'patientId' });
    Patient.hasMany(models.MedicationRequest, { foreignKey: 'patientId' });
    Patient.hasOne(models.Coverage, { foreignKey: 'patientId' });
  };
  return Patient;
};
