// Import the Condition model
const { Condition } = require('../../models');

// Get all conditions
exports.getAllConditions = async (req, res) => {
  try {
    const conditions = await Condition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error retrieving conditions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Get Condition by Patient ID
exports.getConditionByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const condition = await Condition.findAll({ where: { patientId } });
    res.json(condition);
  } catch (error) {
    console.error('Error retrieving Condition:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get condition by ID
exports.getConditionById = async (req, res) => {
  const { conditionId } = req.params;
  try {
    const condition = await Condition.findByPk(conditionId);
    if (!condition) {
      return res.status(404).json({ message: 'Condition not found' });
    }
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error retrieving condition:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new condition
exports.createCondition = async (req, res) => {
  const { patientId, category, type, clinicalStatus } = req.body;
  try {
    const condition = await Condition.create({ patientId, category, type, clinicalStatus });
    res.status(201).json(condition);
  } catch (error) {
    console.error('Error creating condition:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing condition
exports.updateCondition = async (req, res) => {
  const { conditionId } = req.params;
  const { patientId, category, type, clinicalStatus } = req.body;
  try {
    const condition = await Condition.findByPk(conditionId);
    if (!condition) {
      return res.status(404).json({ message: 'Condition not found' });
    }
    await condition.update({ patientId, category, type, clinicalStatus });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error updating condition:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a condition
exports.deleteCondition = async (req, res) => {
  const { conditionId } = req.params;
  try {
    const condition = await Condition.findByPk(conditionId);
    if (!condition) {
      return res.status(404).json({ message: 'Condition not found' });
    }
    await condition.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting condition:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
