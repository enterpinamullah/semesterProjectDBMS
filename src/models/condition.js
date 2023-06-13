const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Condition = sequelize.define('Condition', {
    conditionId: {
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
    category: {
      type: DataTypes.ENUM('encounter-diagnosis', 'problem-list-item')
    },
    type: {
      type: DataTypes.STRING(50)
    },
    clinicalStatus: {
      type: DataTypes.ENUM('active', 'recurrence', 'relapse', 'inactive', 'remission', 'resolved', 'unknown')
    }
  },{freezeTableName: true, timestamps: false});

  Condition.associate = (models) => {
    Condition.belongsTo(models.Patient, { foreignKey: 'patientId' });
  };
  
  return Condition;
};
