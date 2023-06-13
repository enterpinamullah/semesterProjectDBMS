const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const MedicationRequest = sequelize.define('MedicationRequest', {
    medicationRequestId: {
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
    medicationCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'MedicationKnowledge',
        key: 'medicationKnowledgeId'
      }
    },
    performer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Practitioner',
        key: 'practitionerId'
      }
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    daysSupply: {
      type: DataTypes.INTEGER
    },
    whenPrepared: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('active', 'entered-in-error', 'completed', 'stopped', 'draft')
    }
  },{freezeTableName: true, timestamps: false});
  MedicationRequest.associate = (models) => {
    MedicationRequest.belongsTo(models.Patient, { foreignKey: 'patientId' });
    MedicationRequest.belongsTo(models.MedicationKnowledge, { foreignKey: 'medicationCode' });
    MedicationRequest.belongsTo(models.Practitioner, { foreignKey: 'performer' });
  };
  return MedicationRequest;
};
