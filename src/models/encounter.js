const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Encounter = sequelize.define('Encounter', {
    encounterId: {
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
    practitionerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Practitioner',
        key: 'practitionerId'
      }
    },
    date: {
      type: DataTypes.DATE
    },
    diagnosis: {
      type: DataTypes.TEXT
    },
    class: {
      type: DataTypes.ENUM('IMP', 'AMB', 'OBSENC', 'EMER', 'VR', 'HH')
    },
    type: {
      type: DataTypes.ENUM('ADMS', 'BD/BM-clin', 'CCS60', 'OKI')
    }
  },{freezeTableName: true, timestamps: false});
  Encounter.associate = (models) => {
    Encounter.belongsTo(models.Patient, { foreignKey: 'patientId' });
    Encounter.belongsTo(models.Practitioner, { foreignKey: 'practitionerId' });
  };
  return Encounter;
};
