// Import the Insurance model
const { Insurance } = require('../../models');

// Get all insurances
exports.getAllInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.findAll();
    res.status(200).json(insurances);
  } catch (error) {
    console.error('Error retrieving insurances:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get insurance by ID
exports.getInsuranceById = async (req, res) => {
  const { insuranceId } = req.params;
  try {
    const insurance = await Insurance.findByPk(insuranceId);
    if (!insurance) {
      return res.status(404).json({ message: 'Insurance not found' });
    }
    res.status(200).json(insurance);
  } catch (error) {
    console.error('Error retrieving insurance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new insurance
exports.createInsurance = async (req, res) => {
  const { type, name, status } = req.body;
  try {
    const insurance = await Insurance.create({ type, name, status });
    res.status(201).json(insurance);
  } catch (error) {
    console.error('Error creating insurance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing insurance
exports.updateInsurance = async (req, res) => {
  const { insuranceId } = req.params;
  const { type, name, status } = req.body;
  try {
    const insurance = await Insurance.findByPk(insuranceId);
    if (!insurance) {
      return res.status(404).json({ message: 'Insurance not found' });
    }
    await insurance.update({ type, name, status });
    res.status(200).json(insurance);
  } catch (error) {
    console.error('Error updating insurance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete an insurance
exports.deleteInsurance = async (req, res) => {
  const { insuranceId } = req.params;
  try {
    const insurance = await Insurance.findByPk(insuranceId);
    if (!insurance) {
      return res.status(404).json({ message: 'Insurance not found' });
    }
    await insurance.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting insurance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
