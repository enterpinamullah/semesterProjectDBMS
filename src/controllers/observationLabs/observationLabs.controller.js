

const { ObservationLaboratory } = require('../../models');



exports.getAllLaboratory = async (req, res) => {
  try {
    const laboratory = await ObservationLaboratory.findAll();
    res.status(200).json(laboratory);
  } catch (error) {
    console.error('Error retrieving laboratory observations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getLaboratoryByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const observationLaboratory = await ObservationLaboratory.findAll({ where: { patientId } });
    res.json(observationLaboratory);
  } catch (error) {
    console.error('Error retrieving ObservationLaboratory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getLaboratoryById = async (req, res) => {
  const { observationLaboratoryId } = req.params;
  try {
    const laboratory = await ObservationLaboratory.findByPk(observationLaboratoryId);
    if (!laboratory) {
      return res.status(404).json({ message: 'Laboratory observation not found' });
    }
    res.status(200).json(laboratory);
  } catch (error) {
    console.error('Error retrieving laboratory observation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.createLaboratory = async (req, res) => {
  const { patientId, testType, result, units, date } = req.body;
  try {
    const laboratory = await ObservationLaboratory.create({ patientId, testType, result, units, date });
    res.status(201).json(laboratory);
  } catch (error) {
    console.error('Error creating laboratory observation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.updateLaboratory = async (req, res) => {
  const { observationLaboratoryId } = req.params;
  const { patientId, testType, result, units, date } = req.body;
  try {
    const laboratory = await ObservationLaboratory.findByPk(observationLaboratoryId);
    if (!laboratory) {
      return res.status(404).json({ message: 'Laboratory observation not found' });
    }
    await laboratory.update({ patientId, testType, result, units, date });
    res.status(200).json(laboratory);
  } catch (error) {
    console.error('Error updating laboratory observation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.deleteLaboratory = async (req, res) => {
  const { observationLaboratoryId } = req.params;
  try {
    const laboratory = await ObservationLaboratory.findByPk(observationLaboratoryId);
    if (!laboratory) {
      return res.status(404).json({ message: 'Laboratory observation not found' });
    }
    await laboratory.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting laboratory observation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
