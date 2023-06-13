const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const MedicationKnowledge = sequelize.define('MedicationKnowledge', {
    medicationKnowledgeId: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50)
    },
    status: {
      type: DataTypes.ENUM('active', 'entered-in-error', 'inactive')
    },
    price: {
      type: DataTypes.FLOAT
    }
  },{freezeTableName: true, timestamps: false});

  return MedicationKnowledge;
};
