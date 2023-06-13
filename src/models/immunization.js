const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Immunization = sequelize.define('Immunization', {
    immunizationId: {
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
    date: {
      type: DataTypes.DATE
    },
    route: {
      type: DataTypes.STRING(50)
    },
    manufacturer: {
      type: DataTypes.STRING(50)
    },
    lotNumber: {
      type: DataTypes.STRING(50)
    },
    status: {
      type: DataTypes.ENUM('completed', 'entered-in-error', 'not-done')
    }
  },{freezeTableName: true, timestamps: false});

  Immunization.associate = (models) => {
    Immunization.belongsTo(models.Patient, { foreignKey: 'patientId' });
  };
  return Immunization;
};
