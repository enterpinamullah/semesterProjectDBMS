const { DataTypes } = require('sequelize');
const { randomUUID } = require("crypto");

module.exports = (sequelize) => {
  const Insurance = sequelize.define('Insurance', {
    insuranceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM('Bronze', 'Gold', 'Platinum')
    },
    name: {
      type: DataTypes.STRING(50)
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'retired', 'unknown')
    }
  },{freezeTableName: true, timestamps: false});
  Insurance.associate = (models) => {
    Insurance.hasMany(models.Patient, { foreignKey: 'insuranceId' });
    Insurance.hasMany(models.Coverage, { foreignKey: 'insuranceId' });
  };
  
  return Insurance;
};
