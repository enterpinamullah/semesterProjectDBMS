// Import the Practitioner model
const { Practitioner } = require('../../models');

// Get all practitioners
exports.getAllPractitioners = async (req, res) => {
  try {
    const practitioners = await Practitioner.findAll();
    res.status(200).json(practitioners);
  } catch (error) {
    console.error('Error retrieving practitioners:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get practitioner by ID
exports.getPractitionerById = async (req, res) => {
  const { practitionerId } = req.params;
  try {
    const practitioner = await Practitioner.findByPk(practitionerId);
    if (!practitioner) {
      return res.status(404).json({ message: 'Practitioner not found' });
    }
    res.status(200).json(practitioner);
  } catch (error) {
    console.error('Error retrieving practitioner:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new practitioner
exports.createPractitioner = async (req, res) => {
  const { firstName, middleNames, lastName, telecomSystem, address, gender, birthDate, qualificationCode, languageCode } = req.body;
  try {
    const practitioner = await Practitioner.create({ firstName, middleNames, lastName, telecomSystem, address, gender, birthDate, qualificationCode, languageCode });
    res.status(201).json(practitioner);
  } catch (error) {
    console.error('Error creating practitioner:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing practitioner
exports.updatePractitioner = async (req, res) => {
  const { practitionerId } = req.params;
  const { firstName, middleNames, lastName, telecomSystem, address, gender, birthDate, qualificationCode, languageCode } = req.body;
  try {
    const practitioner = await Practitioner.findByPk(practitionerId);
    if (!practitioner) {
      return res.status(404).json({ message: 'Practitioner not found' });
    }
    await practitioner.update({ firstName, middleNames, lastName, telecomSystem, address, gender, birthDate, qualificationCode, languageCode });
    res.status(200).json(practitioner);
  } catch (error) {
    console.error('Error updating practitioner:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a practitioner
exports.deletePractitioner = async (req, res) => {
  const { practitionerId } = req.params;
  try {
    const practitioner = await Practitioner.findByPk(practitionerId);
    if (!practitioner) {
      return res.status(404).json({ message: 'Practitioner not found' });
    }
    await practitioner.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting practitioner:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
