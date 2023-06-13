// Import the Immunization model
const { Immunization } = require('../../models');

// Get all immunizations
exports.getAllImmunizations = async (req, res) => {
  try {
    const immunizations = await Immunization.findAll();
    res.status(200).json(immunizations);
  } catch (error) {
    console.error('Error retrieving immunizations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get immunization by ID
exports.getImmunizationById = async (req, res) => {
  const { immunizationId } = req.params;
  try {
    const immunization = await Immunization.findByPk(immunizationId);
    if (!immunization) {
      return res.status(404).json({ message: 'Immunization not found' });
    }
    res.status(200).json(immunization);
  } catch (error) {
    console.error('Error retrieving immunization:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new immunization
exports.createImmunization = async (req, res) => {
  const { patientId, type, date, route, manufacturer, lotNumber, status } = req.body;
  try {
    const immunization = await Immunization.create({ patientId, type, date, route, manufacturer, lotNumber, status });
    res.status(201).json(immunization);
  } catch (error) {
    console.error('Error creating immunization:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing immunization
exports.updateImmunization = async (req, res) => {
  const { immunizationId } = req.params;
  const { patientId, type, date, route, manufacturer, lotNumber, status } = req.body;
  try {
    const immunization = await Immunization.findByPk(immunizationId);
    if (!immunization) {
      return res.status(404).json({ message: 'Immunization not found' });
    }
    await immunization.update({ patientId, type, date, route, manufacturer, lotNumber, status });
    res.status(200).json(immunization);
  } catch (error) {
    console.error('Error updating immunization:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get Immunization by Patient ID
exports.getImmunizationByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const immunization = await Immunization.findAll({ where: { patientId } });
    res.json(immunization);
  } catch (error) {
    console.error('Error retrieving Immunization:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Delete an immunization
exports.deleteImmunization = async (req, res) => {
  const { immunizationId } = req.params;
  try {
    const immunization = await Immunization.findByPk(immunizationId);
    if (!immunization) {
      return res.status(404).json({ message: 'Immunization not found' });
    }
    await immunization.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting immunization:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
