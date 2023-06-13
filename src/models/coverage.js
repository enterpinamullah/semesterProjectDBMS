const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Coverage = sequelize.define('Coverage', {
    coverageId: {
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
    insuranceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Insurance',
        key: 'insuranceId'
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'cancelled', 'draft', 'entered-in-error')
    },
    name: {
      type: DataTypes.STRING(50)
    }
  },{freezeTableName: true, timestamps: false});
  Coverage.associate = (models) => {
    Coverage.belongsTo(models.Patient, { foreignKey: 'patientId' });
    Coverage.belongsTo(models.Insurance, { foreignKey: 'insuranceId' });
  };
  return Coverage;
};
