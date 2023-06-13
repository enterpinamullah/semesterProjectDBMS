const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Procedures = sequelize.define('Procedures', {
    procedureId: {
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
    datePerformed: {
      type: DataTypes.DATE
    },
    reason: {
      type: DataTypes.STRING(250)
    },
    performer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Practitioner',
        key: 'practitionerId'
      }
    }
  },{freezeTableName: true, timestamps: false});
  Procedures.associate = (models) => {
    Procedures.belongsTo(models.Patient, { foreignKey: 'patientId' });
    Procedures.belongsTo(models.Practitioner, { foreignKey: 'performer' });
  };
  return Procedures;
};
