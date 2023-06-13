// Import the MedicationStatement model
const { MedicationStatement } = require('../../models');

// Get all medication statements
exports.getAllMedicationStatements = async (req, res) => {
  try {
    const medicationStatements = await MedicationStatement.findAll();
    res.status(200).json(medicationStatements);
  } catch (error) {
    console.error('Error retrieving medication statements:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get medication statement by ID
exports.getMedicationStatementById = async (req, res) => {
  const { medicationStatementId } = req.params;
  try {
    const medicationStatement = await MedicationStatement.findByPk(medicationStatementId);
    if (!medicationStatement) {
      return res.status(404).json({ message: 'Medication statement not found' });
    }
    res.status(200).json(medicationStatement);
  } catch (error) {
    console.error('Error retrieving medication statement:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new medication statement
exports.createMedicationStatement = async (req, res) => {
  const { patientId, type, patientInstructions, date, status } = req.body;
  try {
    const medicationStatement = await MedicationStatement.create({ patientId, type, patientInstructions, date, status });
    res.status(201).json(medicationStatement);
  } catch (error) {
    console.error('Error creating medication statement:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing medication statement
exports.updateMedicationStatement = async (req, res) => {
  const { medicationStatementId } = req.params;
  const { patientId, type, patientInstructions, date, status } = req.body;
  try {
    const medicationStatement = await MedicationStatement.findByPk(medicationStatementId);
    if (!medicationStatement) {
      return res.status(404).json({ message: 'Medication statement not found' });
    }
    await medicationStatement.update({ patientId, type, patientInstructions, date, status });
    res.status(200).json(medicationStatement);
  } catch (error) {
    console.error('Error updating medication statement:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a medication statement
exports.deleteMedicationStatement = async (req, res) => {
  const { medicationStatementId } = req.params;
  try {
    const medicationStatement = await MedicationStatement.findByPk(medicationStatementId);
    if (!medicationStatement) {
      return res.status(404).json({ message: 'Medication statement not found' });
    }
    await medicationStatement.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting medication statement:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
