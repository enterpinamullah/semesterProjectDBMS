// Import the ObservationVitalSigns model
const { ObservationVitalSigns } = require('../../models');

// Get all vital signs observations
exports.getAllVitalSigns = async (req, res) => {
  try {
    const vitalSigns = await ObservationVitalSigns.findAll();
    res.status(200).json(vitalSigns);
  } catch (error) {
    console.error('Error retrieving vital signs observations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get ObservationVitalSigns by Patient ID
exports.getVitalSignsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const observationVitalSigns = await ObservationVitalSigns.findAll({ where: { patientId } });
    res.json(observationVitalSigns);
  } catch (error) {
    console.error('Error retrieving ObservationVitalSigns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get vital signs observation by ID
exports.getVitalSignsById = async (req, res) => {
  const { observationVitalSignsId } = req.params;
  try {
    const vitalSigns = await ObservationVitalSigns.findByPk(observationVitalSignsId);
    if (!vitalSigns) {
      return res.status(404).json({ message: 'Vital signs observation not found' });
    }
    res.status(200).json(vitalSigns);
  } catch (error) {
    console.error('Error retrieving vital signs observation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new vital signs observation
exports.createVitalSigns = async (req, res) => {
  const { patientId, type, value, unit, date } = req.body;
  try {
    const vitalSigns = await ObservationVitalSigns.create({ patientId, type, value, unit, date });
    res.status(201).json(vitalSigns);
  } catch (error) {
    console.error('Error creating vital signs observation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing vital signs observation
exports.updateVitalSigns = async (req, res) => {
  const { observationVitalSignsId } = req.params;
  const { patientId, type, value, unit, date } = req.body;
  try {
    const vitalSigns = await ObservationVitalSigns.findByPk(observationVitalSignsId);
    if (!vitalSigns) {
      return res.status(404).json({ message: 'Vital signs observation not found' });
    }
    await vitalSigns.update({ patientId, type, value, unit, date });
    res.status(200).json(vitalSigns);
  } catch (error) {
    console.error('Error updating vital signs observation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a vital signs observation
exports.deleteVitalSigns = async (req, res) => {
  const { observationVitalSignsId } = req.params;
  try {
    const vitalSigns = await ObservationVitalSigns.findByPk(observationVitalSignsId);
    if (!vitalSigns) {
      return res.status(404).json({ message: 'Vital signs observation not found' });
    }
    await vitalSigns.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting vital signs observation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
