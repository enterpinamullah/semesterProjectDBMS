

const { Insurance } = require('../../models');



exports.getAllInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.findAll();
    res.status(200).json(insurances);
  } catch (error) {
    console.error('Error retrieving insurances:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



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
