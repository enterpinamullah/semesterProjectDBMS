const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const ObservationLaboratory = sequelize.define('ObservationLaboratory', {
    observationLaboratoryId: {
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
      type: DataTypes.STRING(50)
    },
    value: {
      type: DataTypes.FLOAT
    },
    unit: {
      type: DataTypes.STRING(20)
    },
    referenceRange: {
      type: DataTypes.STRING(50)
    },
    interpretation: {
      type: DataTypes.STRING(250)
    },
    date: {
      type: DataTypes.DATE
    }
  },{freezeTableName: true, timestamps: false});
  ObservationLaboratory.associate = (models) => {
    ObservationLaboratory.belongsTo(models.Patient, { foreignKey: 'patientId' });
  };
  return ObservationLaboratory;
};
