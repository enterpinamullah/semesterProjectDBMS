// Import the AllergyIntolerance model
const { AllergyIntolerance } = require('../../models');

// Get all allergy intolerances
exports.getAllAllergyIntolerances = async (req, res) => {
  try {
    const allergyIntolerances = await AllergyIntolerance.findAll();
    res.status(200).json(allergyIntolerances);
  } catch (error) {
    console.error('Error retrieving allergy intolerances:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get AllergyIntolerance by Patient ID
exports.getAllergyByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const allergyIntolerance = await AllergyIntolerance.findAll({ where: { patientId } });
    res.json(allergyIntolerance);
  } catch (error) {
    console.error('Error retrieving AllergyIntolerance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get allergy intolerance by ID
exports.getAllergyIntoleranceById = async (req, res) => {
  const { practitionerId } = req.params;
  try {
    const allergyIntolerance = await AllergyIntolerance.findByPk(practitionerId);
    if (!allergyIntolerance) {
      return res.status(404).json({ message: 'Allergy intolerance not found' });
    }
    res.status(200).json(allergyIntolerance);
  } catch (error) {
    console.error('Error retrieving allergy intolerance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new allergy intolerance
exports.createAllergyIntolerance = async (req, res) => {
  const { patientId, name, date, reaction, reactionOnsetDate } = req.body;
  try {
    const allergyIntolerance = await AllergyIntolerance.create({ patientId, name, date, reaction, reactionOnsetDate });
    res.status(201).json(allergyIntolerance);
  } catch (error) {
    console.error('Error creating allergy intolerance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing allergy intolerance
exports.updateAllergyIntolerance = async (req, res) => {
  const { allergyIntoleranceId } = req.params;
  const { patientId, name, date, reaction, reactionOnsetDate } = req.body;
  try {
    const allergyIntolerance = await AllergyIntolerance.findByPk(allergyIntoleranceId);
    if (!allergyIntolerance) {
      return res.status(404).json({ message: 'Allergy intolerance not found' });
    }
    await allergyIntolerance.update({ patientId, name, date, reaction, reactionOnsetDate });
    res.status(200).json(allergyIntolerance);
  } catch (error) {
    console.error('Error updating allergy intolerance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete an allergy intolerance
exports.deleteAllergyIntolerance = async (req, res) => {
  const { allergyIntoleranceId } = req.params;
  try {
    const allergyIntolerance = await AllergyIntolerance.findByPk(allergyIntoleranceId);
    if (!allergyIntolerance) {
      return res.status(404).json({ message: 'Allergy intolerance not found' });
    }
    await allergyIntolerance.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting allergy intolerance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
