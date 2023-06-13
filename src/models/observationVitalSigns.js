const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const ObservationVitalSigns = sequelize.define('ObservationVitalSigns', {
    observationVitalSignsId: {
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
    date: {
      type: DataTypes.DATE
    }
  },{freezeTableName: true, timestamps: false});
  ObservationVitalSigns.associate = (models) => {
    ObservationVitalSigns.belongsTo(models.Patient, { foreignKey: 'patientId' });
  };
  
  return ObservationVitalSigns;
};
