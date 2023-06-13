const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Claims = sequelize.define('Claims', {
    claimId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    medicationRequestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MedicationRequest',
        key: 'medicationRequestId'
      }
    },
    coverageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Coverage',
        key: 'coverageId'
      }
    },
    claimDate: {
      type: DataTypes.DATE
    },
    claimAmount: {
      type: DataTypes.FLOAT
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('active', 'cancelled', 'draft', 'entered-in-error')
    }
  },{freezeTableName: true, timestamps: false});
  Claims.associate = (models) => {
    Claims.belongsTo(models.MedicationRequest, { foreignKey: 'medicationRequestId' });
    Claims.belongsTo(models.Coverage, { foreignKey: 'coverageId' });
  };
  return Claims;
};
